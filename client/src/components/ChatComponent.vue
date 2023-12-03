<template>
  <div class="chat-container">
    <nav class="navbar">
      <span class="navbar-brand">{{ otherUsername }}</span>
    </nav>
    <ul class="messages">
      <li v-for="message in messages" :key="message.timestamp"
        :class="{ 'sender': message.isSender, 'receiver': !message.isSender }">
        <span class="message-text">{{ message.text }}</span>
        <span class="timestamp">{{ message.timestamp }}</span>
      </li>
    </ul>
    <div class="message-input-container">
      <v-text-field label="Type a message" v-model="newMessage" @keyup.enter="sendMessage"></v-text-field>
      <v-btn icon @click="showOptions"><span class="material-icons">attach_file</span></v-btn>
      <v-btn color="primary" @click="sendMessage">Send</v-btn>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { VTextField, VBtn } from 'vuetify/lib/components';

export default {
  components: {
    VTextField,
    VBtn
  },
  data() {
    return {
      socket: null,
      newMessage: '',
      messages: [],
      loggedInUserId: JSON.parse(sessionStorage.getItem('user')).id,
      otherUserId: this.$route.params.userId,
      otherUsername: this.$route.params.username,
    };
  },
  mounted() {
    this.socket = io(process.env.VUE_APP_SOCKET_URL);

    // Join the chat when the component is mounted
    this.socket.emit('joinChat', this.loggedInUserId, this.otherUserId);

    this.socket.on('message', (receivedMessage) => {
      console.log(receivedMessage); 
  const { text, timestamp, senderId } = receivedMessage;
  const isSender = senderId === this.loggedInUserId;
  this.messages.push({ text, timestamp, senderId, isSender });
});
  },
  beforeUnmount() {
    // Leave the chat when the component is destroyed
    this.socket.emit('leaveChat');
    this.socket = null;
  },
  methods: {
    scrollToBottom() {
      const messagesContainer = this.$el.querySelector(".messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    sendMessage() {
  if (this.newMessage.trim() !== '') {
    const newMsg = {
      text: this.newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      senderId: this.loggedInUserId,
    };
    this.socket.emit('message', newMsg); // Send the object directly
    this.newMessage = '';
  }
  this.scrollToBottom();
},
  },
};
</script>




<style scoped>
/* .chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
} */

/* .messages {
  flex-grow: 1;
  overflow-y: auto;
} */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
}
.messages li {
  margin-bottom: 10px;
}

input[type="text"] {
  margin-top: 10px;
}

.messages li {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.sender {
  background-color: #e0e0e0;
  text-align: right;
}

.receiver {
  background-color: #f0f0f0;
  text-align: left;
}


.timestamp {
  display: block;
  font-size: 0.8em;
  color: #888;
}


.chat-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Take full viewport height */
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 10px; /* Space for input container */
 
}

.message-input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  gap: 10px; /* This will create space between elements */
}

.message-input-container > * {
  margin: 0 5px; /* Adds margin to the left and right of each element */
}

/* If you want more specific control: */
.message-input-container .v-text-field {
  flex-grow: 1; /* This will make the text field take up available space */
}

/* Add responsive styles as needed */
/* @media (max-width: 600px) {
  .message-input-container {
    flex-direction: column;
  }
} */


</style>
