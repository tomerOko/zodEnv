export default {
    DB:{
        cache:{
            provider:"redis",
            url:"http://something.cluster.55",
            username:"some name in 55",
            password:"some password in 55"
        },
        service:{
            provider:"mysql",
            url:"http://something",
            username:"some name",
            password:"some password"
        },
        session:{
            provider:"mongo",
            url:"http://something",
            username:"some name",
            password:"some password"
        }
    
    }  
}