// timer class star , stop , ... 
export class time{

    constructor(){
        this.sec = 0;
        this.min = 0;

        this.dom = document.querySelector("#table_timer");
        this.strTime = "00:00";

        this.matchEndTime = "00:00";
        
        // update timer & render time in table
        this.updateTimer = () => {
            if(this.sec >= 60) this.min += 1;
            this.sec = (this.sec >= 60) ? 0 : this.sec + 1;

            this.strTime = ( (this.min < 10) ? "0" + this.min : this.min ) +" : "+ ( (this.sec < 10) ? "0" + this.sec : this.sec );

            this.dom.textContent = this.strTime;
        }

        // live timer
        this.updateInterval = null;
        
        // start timer
        this.start = () => {
            this.updateInterval = setInterval( this.updateTimer , 1000);
        }
        
        // stop timer
        this.stop = () => {
            // stop timer
            clearInterval(this.updateInterval);
            // save how much take this match to end
            //let match_time = this.strTime;

            console.log("match stop at :" + this.strTime)
        }

        // reset timer
        this.reset = () => {
            // stop timer
            clearInterval(this.updateInterval);

            // save match time
            this.matchEndTime = this.strTime;
            // clear
            this.strTime = "00:00";
            this.dom.textContent = this.strTime;
            // reset
            this.sec = 0;
            this.min = 0;

            console.log("match end at :" , this.matchEndTime);
        }
        
    }
}