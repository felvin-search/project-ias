import { ENV_BACKEND_URL, ENV_FRONTEND_URL } from "./envConstants";

export const BACKEND_URL = ENV_BACKEND_URL;
export const FRONTEND_URL = ENV_FRONTEND_URL;

export const SEARCHCLIENT_URL = "https://search.project-ias.com";
export const GA_MEASUREMENT_ID = "G-QDM8PF4XX9";

const MANUAL_SEARCH_URL = `${BACKEND_URL}/search`;
export const MAINS_URL = `${MANUAL_SEARCH_URL}/search_pyq`;
export const PRELIMS_URL = `${MANUAL_SEARCH_URL}/search_prelims`;
export const DNS_URL = `${MANUAL_SEARCH_URL}/search_dns`;
export const CONTENT_URL = `${MANUAL_SEARCH_URL}/search_content`;
export const WFV_URL = `${MANUAL_SEARCH_URL}/search_wfv`;
export const VISION_URL = `${MANUAL_SEARCH_URL}/search_vision`;

export const LOG_URL = `${BACKEND_URL}/log`;

export const SIGNUP_URL = `${BACKEND_URL}/signup`;
export const SIGNIN_URL = `${BACKEND_URL}/signin`;

export const USER_ROUTE_URL = `${BACKEND_URL}/user`;
export const USER_URL = `${USER_ROUTE_URL}/currentuser`;

export const USER_PRELIMS_URL = `${BACKEND_URL}/user_prelims`;
export const USER_MAINS_URL = `${USER_ROUTE_URL}/user_mains`;

export const TOPICS_URL = `${USER_ROUTE_URL}/topics`;

const PREMIUM_URL = `${BACKEND_URL}/premium`;
export const SUBSCRIPTION_PLANS_URL = `${PREMIUM_URL}/subscriptionPlans`;
export const COUPON_URL = `${PREMIUM_URL}/coupon`;

export const TELEGRAM_URL = "https://t.me/joinchat/TlvHlSsdL2wwMDE9";
export const INSTA_URL = "https://www.instagram.com/project.ias/";
