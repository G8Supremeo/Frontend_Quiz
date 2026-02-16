// ===== AUTHENTICATION MODULE =====
// Handles login, signup, and session management using localStorage

const Auth = {
    // Get currently logged-in user (or null)
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    // Sign up a new user
    signup(name, email, password) {
        // Get existing users or empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        const exists = users.find(u => u.email === email);
        if (exists) {
            return { success: false, message: 'Email already registered!' };
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        // Save to users list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Log them in
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return { success: true };
    },

    // Log in an existing user
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return { success: false, message: 'Invalid email or password!' };
        }

        // Save session
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    },

    // Log out the current user
    logout() {
        localStorage.removeItem('currentUser');
    }
};
