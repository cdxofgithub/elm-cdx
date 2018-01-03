let baseUrl = 'http://cangdu.org:8001';
let routerMode = 'hash';
let imgBaseUrl = 'http://images.cangdu.org/';

if (process.env.NODE_ENV == 'development') {
	imgBaseUrl = 'http://cangdu.org:8001/img/';
} else if (process.env.NODE_ENV == 'production') {
	imgBaseUrl = 'http://cangdu.org:8001/img/';
  // baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
