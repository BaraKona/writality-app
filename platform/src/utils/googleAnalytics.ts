import ReactGA from "react-ga4";

export function initGoogleAnalytics(googleAnalyticsId?: string) {
	if (!googleAnalyticsId) {
		console.warn("[Google Analytics] ID not provided");
		return;
	}
	ReactGA.initialize(googleAnalyticsId, {
		gaOptions: {
			// send_page_view: false,
			page_title: getParentPageTitle() || window.location.hostname,
			page_location: getParentOrigin() || window.location.href,
			page: getParentOrigin() || window.location.href,
			allowLinker: true,
		},
	});

	console.log("[Google Analytics] initialised");
}

export function sendEvent(event: {
	action: string;
	name: string;
	category: string;
	label?: string;
	value?: number;
}) {
	if (ReactGA.isInitialized) {
		ReactGA.event(event.name, {
			action: event.action,
			category: event.category,
			label: event.label,
			value: event.value,
		});
	}
}

const widgetCategory = "Widget";

export const detailsSubmittedEvent = {
	name: "Chat Widget - Contact details submitted",
	action: "Chat Widget - Contact details submitted",
	category: widgetCategory,
};

export const linkClickEvent = {
	name: "Chat Widget - Link clicked",
	action: "Chat Widget - Link clicked",
	category: widgetCategory,
};

export const conversationStartedEvent = {
	name: "Chat Widget - Conversation started",
	action: "Chat Widget - Conversation started",
	category: widgetCategory,
};

export const messageSentEvent = {
	name: "Chat Widget - Message sent",
	action: "Chat Widget - Message sent",
	category: widgetCategory,
};

export function getParentOrigin() {
	if (parent !== window) {
		try {
			return new URL(document.referrer).origin;
		} catch (e) {
			return "";
		}
	}
	return "";
}

export function getParentPageTitle() {
	if (parent !== window) {
		try {
			return document.referrer || window.parent.document.title;
		} catch (e) {
			return "";
		}
	}
	return "";
}
