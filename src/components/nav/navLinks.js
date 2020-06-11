export const navLinks = [
	{ url: '/', title: 'home', type: 'button' },
	{ url: '/gigs', title: 'gigs', type: 'button' },
	{ url: '/music', title: 'music', type: 'button' },
	{ url: '/bio', title: 'bio', type: 'button' },
	{ url: '/store', title: 'store', type: 'link' },
	{ url: '/contact', title: 'contact', type: 'button' },
];

export const authLinks = [
	{ url: '/', title: 'home', type: 'link' },
	{ url: '/store', title: 'store', type: 'link' },
	{ url: '/store/signup', title: 'signup', type: 'link' },
	{ url: '/store/login', title: 'login', type: 'link' },
	{ url: '/store', title: 'cart', type: 'button' },
];

export const authLinksAuthorized = [
	{ url: '/', title: 'home', type: 'link' },
	{ url: '/store', title: 'store', type: 'link' },
	{ url: '/store', title: 'cart', type: 'button' },
	{ url: '/store/logout', title: 'logout', type: 'button' },
];

export const adminLinks = [{ url: '/store/additem', title: 'upload', type: 'link' }];
