<template>
    <div class="d-flex vh-100 justify-content-center align-items-center">
        <div class="card" style="max-width: 400px;">
            <div class="card-body">
                <h5 class="card-title text-center">Login</h5>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username:</label>
                        <input type="text" id="username" v-model="username" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password:</label>
                        <input type="password" id="password" v-model="password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            accounts: [
                { username: 'user1', password: 'pass1' ,id: 1},
                { username: 'user2', password: 'pass2' , id: 2},
            ],
        };
    },
    methods: {
  login() {
    const account = this.accounts.find(acc => acc.username === this.username && acc.password === this.password);
    if (account) {
      sessionStorage.setItem('user', JSON.stringify(account)); // Store user in session storage
      this.$router.push('/users'); // Redirect to chat page
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  },
},
};
</script>