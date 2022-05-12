export const ROLE = Object.freeze({
    staff: 'staff',
    student: 'student',
    admin: 'admin'
});

export const AVAL = Object.freeze({
    booked: 'booked',
    public: 'public',
    private: 'private'
})

export const PAGE_TYPES = Object.freeze({
    auth: 'auth',
    private: 'private',
    role: 'role',
    booking: 'booking'
})

export const BOOKING = Object.freeze({
    book: 'book',
    unbook: 'unbook',
})

export const MESSAGE_TYPES = Object.freeze({
    error: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info'
})