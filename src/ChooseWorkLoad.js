import flux from './Flux';

class ChooseWorkLoad {

    constructor(){
        this.flux = flux;
    }

    index(req,res){
        if ( this.flux.getWorkloads().includes(req.text)){
            return this.flux.getImages();
        }
        else {
            return this.getWorkloads();
        }
    }

    getWorkloads(){
        const workloads = this.flux.getWorkloads();
        const options = workloads.map(wl => {
            return {
                text: wl,
                value: wl
            };
        })
        return {
            "text": "workload selection",
            "attachments": [
                {
                    "text": "available workloads are:",
                    "fallback": "workload selection fallback",
                    "color": "#3AA3E3",
                    "callback_id": "wl_selection",
                    "actions": [
                        {
                            options,
                            "name": "wls_list",
                            "text": "choose a workload",
                            "type": "select"
                        }
                    ]
                }
            ]
        }
    }
}
export default new ChooseWorkLoad();

