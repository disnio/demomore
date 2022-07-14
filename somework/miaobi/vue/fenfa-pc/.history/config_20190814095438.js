var config = {
    // apihost: "http://192.168.218.50:8100",
    // apihost: window.location.origin,
    apihost: window.location.origin,
    apiNode: "/marketing_api/",
    apiPath(){
        return this.apihost + this.apiNode;
    }
};

