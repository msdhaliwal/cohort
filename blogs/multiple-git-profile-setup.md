Many developers work with multiple GitHub accounts—one for personal projects and another for work. Managing multiple accounts with SSH authentication and commit signing can be tricky, but in this guide, I'll walk you through setting up both seamlessly.

> for windows use either **Git Bash** or **PowerShell**

1. ## **Generate Separate SSH Keys**
    
    We need two separate SSH keys: one for your **personal GitHub** and another for your **work GitHub**.
    
    Run the following commands to generate them:
    
    ```plaintext
    ssh-keygen -t ed25519 -C "yourpersonal@email.com" -f ~/.ssh/id_ed25519_personal
    ssh-keygen -t ed25519 -C "yourwork@email.com" -f ~/.ssh/id_ed25519_work
    ```
    
    `ssh-keygen -t ed25519 -C ‘yourpersonal@email.com’` this part will create ssh key
    
    `-f ~/.ssh/id_ed25519_personal` -f stands for file and it will make sure our file is saved with name we provide.
    
    This will create two key pairs:
    
    **Personal:** `~/.ssh/id_ed25519_personal` and `~/.ssh/id_ed25519_personal.pub`
    
    **Work:** `~/.ssh/id_ed25519_work` and `~/.ssh/id_ed25519_work.pub`
    
2. ## **Configure SSH for Multiple Accounts**
    
    we’ll configure SSH to use the correct key for each GitHub account. Edit or create your SSH config file:
    
    ***For Mac:***
    
    ```plaintext
    nano ~/.ssh/config
    ```
    
    ***For windows:***
    
    ```plaintext
    notepad $env:USERPROFILE\.ssh\config
    ```
    
    Add the following configuration:
    
    ```plaintext
    # Personal GitHub
    Host github-personal
        HostName github.com
        User git
        IdentityFile ~/.ssh/id_ed25519_personal
        IdentitiesOnly yes
    
    # Work GitHub
    Host github-work
        HostName github.com
        User git
        IdentityFile ~/.ssh/id_ed25519_work
        IdentitiesOnly yes
    ```
    
    Convert the file to Unix format and set permissions:
    
    ***For Mac:***
    
    ```plaintext
    tr -d '\r' < ~/.ssh/config > ~/.ssh/config_fixed && mv ~/.ssh/config_fixed ~/.ssh/config
    chmod 600 ~/.ssh/config
    ```
    
    ***For Windows:***
    
    ```plaintext
    (Get-Content $env:USERPROFILE\.ssh\config) -replace "`r", "" | Set-Content $env:USERPROFILE\.ssh\config
    icacls $env:USERPROFILE\.ssh\config /inheritance:r /grant:r "$($env:USERNAME):(R,W)"
    ```
    
    ### **Test the SSH Connection**
    
    Run these commands to verify:
    
    ```plaintext
    ssh -T git@github-personal
    
    ssh -T git@github-work
    ```
    
    If configured correctly, you should see:
    
    ```plaintext
    Hi yourusername! You've successfully authenticated...
    Hi yourworkusername! You've successfully authenticated..
    ```
    
3. ## **Add SSH Keys to GitHub**
    
    Copy each public key and add it to the respective GitHub account under **Settings → SSH and GPG Keys**.:
    
    ```plaintext
    cat ~/.ssh/id_ed25519_personal.pub
    cat ~/.ssh/id_ed25519_work.pub
    ```
    
4. ## **Configure Git to Use Different Profiles**
    
    Set up global config for your personal account:
    
    ```plaintext
    git config --global user.name "Your Personal Name"
    git config --global user.email "yourpersonal@email.com"
    ```
    
    For work repositories, override this with local config:
    
    ```plaintext
    cd ~/work-repo
    git config --local user.name "Your Work Name"
    git config --local user.email "yourwork@email.com"
    ```
    
    `/work-repo` here can be either you git repo or root directory under which you will clone all work repos
    
5. ## **Set Up Commit Signing for Both Accounts**
    
    GitHub allows you to sign commits using SSH keys. First, configure Git to use SSH signing:
    
    ```plaintext
    git config --global gpg.format ssh
    ```
    
    ### Personal Signing Key
    
    ```plaintext
    git config --global user.signingkey ~/.ssh/id_ed25519_personal.pub
    git config --global commit.gpgsign true
    ```
    
    ### Work Signing Key (Local Override)
    
    Inside your work repository:
    
    ```plaintext
    git config --local user.signingkey ~/.ssh/id_ed25519_work.pub
    git config --local commit.gpgsign true
    ```
    
    ### **Add SSH Signing Key to GitHub**
    
    Go to **GitHub → Settings → SSH and GPG Keys → New SSH Key** and select **Signing Key**. Paste your SSH public key (`.pub`).
    
6. ## **Configure Allowed Signers for Verification**
    
    Create a file to list trusted signing keys:
    
    ***For Mac:***
    
    ```plaintext
    touch ~/.ssh/allowed_signers
    ```
    
    ***For Windows:***
    
    ```plaintext
    New-Item -ItemType File -Path $env:USERPROFILE\.ssh\allowed_signers
    ```
    
    Edit it (Mac):
    
    ```plaintext
    nano ~/.ssh/allowed_signers
    ```
    
    Edit it (windows):
    
    ```plaintext
    notepad $env:USERPROFILE\.ssh\allowed_signers
    ```
    
    Add the following lines:
    
    ```plaintext
    <yourpersonalusername> ssh-ed25519 <public key for personal account>
    <yourworkusername> ssh-ed25519 <public key for work account>
    ```
    
    Convert the file to Unix format and set permissions:
    
    ***For Mac:***
    
    ```plaintext
    tr -d '\r' < ~/.ssh/allowed_signers > ~/.ssh/allowed_signers_fixed && mv ~/.ssh/allowed_signers_fixed ~/.ssh/allowed_signers
    chmod 600 ~/.ssh/allowed_signers
    ```
    
    ***For Windows:***
    
    ```plaintext
    (Get-Content $env:USERPROFILE\.ssh\allowed_signers) -replace "`r", "" | Set-Content $env:USERPROFILE\.ssh\allowed_signers
    icacls $env:USERPROFILE\.ssh\allowed_signers /inheritance:r /grant:r "$($env:USERNAME):(R,W)"
    ```
    
    Configure Git to use it
    
    ***For Mac:***
    
    ```plaintext
    git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
    ```
    
    ***For windows:***
    
    ```plaintext
    git config --global gpg.ssh.allowedSignersFile $env:USERPROFILE\.ssh\allowed_signers
    ```
    
    Setting work repositories:
    
    ***For Mac:***
    
    ```plaintext
    git config --local gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
    ```
    
    ***For Windows:***
    
    ```plaintext
    git config --local gpg.ssh.allowedSignersFile $env:USERPROFILE\.ssh\allowed_signers
    ```
    
7. ## **Verify Signed Commits**
    
    Make a test commit in one of your repos:
    
    ```plaintext
    git commit -S -m "Test signed commit"
    ```
    
    verify if it works:
    
    ```plaintext
    git log --show-signature
    ```
    
    If everything is correct, you should see:
    
    ```plaintext
    Good signature from SSH key ID SHA256:xxxxxxxx
    ```
    
    And GitHub will show commits as **"Verified"**. ✅
    
    ![](commits.png)