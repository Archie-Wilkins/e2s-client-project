class SiteAdapter {
    constructor(site) {
        this.site = site;
    }

    getSiteName() {
        return this.site.name;
    }

    getSiteUrl() {
        return this.site.url;
    }
}