class Router {
    constructor(el) {
        this.el = el;
        this.routes = {};
    }

    start() {
        const routeHandler = () => this.route();
        window.addEventListener("hashchange", routeHandler);
        window.addEventListener("load", routeHandler);
        this.route();
    }

    register(route) {
        this.routes[route.route] = route;
    }

    route() {
        const hashRoute = location.hash.slice(1) || "default";
        const route = this.routes[hashRoute];

        if (this.el && route && route !== this.currentRoute) {
            this.currentRoute = route;
            this.el.innerHTML = route.render();
        } else {
            this.currentRoute = null;
        }
    }
}

const router = new Router(document.querySelector("#content"));
const routables = document.querySelectorAll("[data-route]");
routables.forEach((routable) => {
    const route = routable.getAttribute("data-route");
    router.register({
        route,
        render: () => routable.innerHTML,
    });
});
router.start();
