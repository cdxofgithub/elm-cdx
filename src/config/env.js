let baseUrl = 'http://cangdu.org:8001';
let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';

if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

  // baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
