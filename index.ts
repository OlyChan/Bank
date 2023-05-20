// script.ts

alert("The username is 'Nithub user',the password is 'nithub' ")
class User {
  username: string;
  password: string;
  balance: number;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.balance = 0;
  }

  deposit(amount: number) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Successfully deposited $${amount}`);
      this.updateBalance();
      alert(`Successfully deposited $${amount}`);
    } else {
      console.log("Invalid amount. Deposit failed.");
      alert("Invalid amount. Deposit failed.");
    }
  }

  withdraw(amount: number) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Successfully withdrew $${amount}`);
      this.updateBalance();
      alert(`Successfully withdrew $${amount}`);
    } else {
      console.log("Insufficient balance or invalid amount. Withdrawal failed.");
      alert("Insufficient balance or invalid amount. Withdrawal failed.");
    }
  }

  transfer(amount: number, recipient: User) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      recipient.balance += amount;
      console.log(`Successfully transferred $${amount} to ${recipient.username}`);
      this.updateBalance();
      recipient.updateBalance();
      alert(`Successfully transferred $${amount} to ${recipient.username}`);
    } else {
      console.log("Insufficient balance or invalid amount. Transfer failed.");
      alert("Insufficient balance or invalid amount. Transfer failed.");
    }
  }

  updateBalance() {
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.textContent = this.balance.toString();
    }
  }
}

let currentUser: User | null = null;

function login() {
  const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
  const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;

  if (usernameInput.value === "Nithub user" && passwordInput.value === "nithub") {
  
    currentUser = new User(usernameInput.value, passwordInput.value);

    
    document.getElementById("loginForm")!.style.display = "none";
    document.getElementById("dashboard")!.style.display = "block";
    document.getElementById("welcomeMessage")!.textContent = `Welcome, ${currentUser.username}!`;
    document.getElementById("balance")!.textContent = currentUser.balance.toString();
  } else {
    alert("Invalid username or password");
  }


  
  usernameInput.value = "";
  passwordInput.value = "";
}

function deposit() {
  const depositInput = document.getElementById("depositInput") as HTMLInputElement;
  const amount = parseFloat(depositInput.value);
  if (!isNaN(amount) && currentUser) {
    currentUser.deposit(amount);
    depositInput.value = "";
  } else {
    alert("Invalid amount. Deposit failed.");
  }
}

function transfer() {
  const recipientInput = document.getElementById("recipientInput") as HTMLInputElement;
  const transferInput = document.getElementById("transferInput") as HTMLInputElement;
  const amount = parseFloat(transferInput.value);
  if (!isNaN(amount) && currentUser) {
    const recipientUsername = recipientInput.value;
    if (recipientUsername && recipientUsername !== currentUser.username) {
      const recipient = new User(recipientUsername, "");
      currentUser.transfer(amount, recipient);
      recipientInput.value = "";
      transferInput.value = "";
    } else {
      console.log("Invalid recipient username");
      alert("Invalid recipient username");
    }
  } else {
    alert("Invalid amount or user. Transfer failed.");
  }
}

function withdraw() {
  const withdrawInput = document.getElementById("withdrawInput") as HTMLInputElement;
  const amount = parseFloat(withdrawInput.value);
  if (!isNaN(amount) && currentUser) {
    currentUser.withdraw(amount);
    withdrawInput.value = "";
  } else {
    alert("Invalid amount. Withdrawal failed.");
  }
}
