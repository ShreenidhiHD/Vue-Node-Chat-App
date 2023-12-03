<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center my-4">User List</h1>
                <div v-for="user in users.filter(u => u.id !== loggedInUserId)" :key="user.id" class="card mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <span :class="{ 'text-success': user.status === 'online', 'text-muted': user.status === 'offline' }">
                                <i class="fas fa-circle"></i>
                            </span>
                            {{ user.name }}
                        </div>
                        <button @click="connect(user)" class="btn btn-primary">Chat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [
                { id: 1, name: 'User 1', status: 'online' },
                { id: 2, name: 'User 2', status: 'offline' },
                { id: 3, name: 'User 3', status: 'online' },
                // Add more users as needed
            ],
            loggedInUserId: JSON.parse(sessionStorage.getItem('user')).id,
        };
    },
methods: {
  connect(user) {
    
    this.$router.push({ name: 'Chat', params: { userId: user.id, username: user.name } });
  },
},
};
</script>