import { writable } from 'svelte/store';

export const searchTerm = writable('');
export const filteredUsers = writable([]);

export function filterUsers(users, term) {
    const filtered = users.filter(user => 
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.first_name.toLowerCase().includes(term.toLowerCase()) ||
        user.last_name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );
    filteredUsers.set(filtered);
}