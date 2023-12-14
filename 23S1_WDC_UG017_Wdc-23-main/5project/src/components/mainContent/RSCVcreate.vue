<template>
    <div class="club-create-container">
        <h1 class="club-create-header">RSVP Submit</h1>
        <div class="club-create-form-container">
            <div class="form-group mb-3">
                <label for="club" class="club-create-label">Club:</label>
                <select class="club-create-select" id="club" v-model="club">
                    <option value="">-- Select Club --</option>
                    <option v-for="club in clubs" :key="club.club_id" :value="club.club_id">{{ club.club_name }}, clubid: {{
                        club.club_id }}</option>
                </select>
            </div>
            <form @submit.prevent="newsSubmit" class="club-create-form">
                <div class="form-group">
                    <label for="message" class="club-create-label">Message:</label>
                    <input type="text" class="club-create-input" id="message" v-model="message">
                </div>
                <button type="submit" class="btn btn-primary club-create-submit-btn" :disabled="isCreating">Submit</button>
            </form>
            <div v-if="isCreating" class="loading club-create-loading">Submitting...</div>
            <div v-if="showSuccess" class="success-msg club-create-success-msg">Submitted successfully!</div>
        </div>
    </div>
</template>
<style>
.club-create-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f1f2f6;
    padding: 20px;
}

.club-create-header {
    margin-bottom: 2rem;
}

.club-create-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 500px;
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.club-create-label {
    font-weight: bold;
    margin-right: 1rem;
}

.club-create-select {
    width: 100%;
    margin-bottom: 2rem;
}

.club-create-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.club-create-input {
    width: 100%;
    margin-bottom: 2rem;
}

.club-create-submit-btn {
    width: 100%;
    margin-top: 2rem;
}

.club-create-loading {
    margin-top: 2rem;
}

.club-create-success-msg {
    margin-top: 2rem;
    color: green;
}
</style>
    
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: "RSCVcreate",
    mounted() {
        if (!this.$store.state.isAuthenticated) {
            alert("please login")
            this.$router.push('/')
        }
    },
    data() {
        return {
            message: "",
            club: "",
            isCreating: false,
            showSuccess: false,
            clubs: [],
        };
    },
    created() {
        this.fetchClubs();
    },
    computed: {
        ...mapState({
            isAuthenticated: (state) => state.isAuthenticated,
            username: (state) => state.username,
            Permission: (state) => state.Permission,
            user_id: (state) => state.user_id,
        }),
    },

    methods: {
        async fetchClubs() {
            try {
                const apiUrl = "http://localhost:3000/api";
                const response = await axios.post(`${apiUrl}/managed_clubs`, { user_id: this.user_id });
                this.clubs = response.data;
            } catch (error) {
                console.error("Error fetching clubs:", error);
                alert("Failed to fetch clubs.");
            }
        },
        newsSubmit() {
            const data = {
                message: this.message,
                imageSrc: this.imageUrl,
                user_id: this.user_id,
                club_id: this.club,
                time: new Date().toLocaleString(),
            };

            this.isCreating = true; // 显示loading提示
            axios
                .post("http://127.0.0.1:3000/api/RSCVcreate", data)
                .then((response) => {
                    console.log(response.data);
                    this.message = ""; // 清空表单输入框内容
                    this.club = "";
                    this.isCreating = false; // 隐藏loading提示
                    this.showSuccess = true; // 显示添加成功的提示
                })
                .catch((error) => {
                    console.log(error);
                    this.isCreating = false; // 隐藏loading提示
                });
        },
    },
};
</script>
    
    
    
    