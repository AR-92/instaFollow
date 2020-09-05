
class instaFollow{
    constructor(opt){
        this.username=opt.username;
        this.profile=undefined;
        this.init();
    }
    init(){
        this.getProfile(this.username).then((s)=>{
            this.profile=s;
            this.storeLocally(s);
        });
        this.profile=this.getLocalData();
        this.html();
        this.insert();
    };
    getProfile(){
        return new Promise((resolve,reject)=>{
            try{
                fetch(`https://www.instagram.com/${this.username}/?__a=1`)
  .then(response => response.json())
  .then(data => {
      console.log("data ",data)
    resolve({
        biography:data.graphql.user.biography,
        external_url:data.graphql.user.external_url,
        full_name:data.graphql.user.full_name,
        profile_pic_url:data.graphql.user.profile_pic_url,
        profile_pic_url_hd:data.graphql.user.profile_pic_url_hd,
        username:data.graphql.user.username,
        follow:data.graphql.user.edge_follow.count,
        followed_by:data.graphql.user.edge_followed_by.count,
        id:data.graphql.user.id,
    }); 
  })
            }catch{
                console.error("instaFollow: can't get instagram profile")
            }
            })
    };
    storeLocally(obj){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("instaFollow", JSON.stringify(obj));
          } else {
            console.error("Sorry !  Browser Does Not Support Local Storage")
          }
    };
    getLocalData(){
        if(localStorage.getItem("instaFollow")){
            return JSON.parse(localStorage.getItem("instaFollow"));
        }else{
            return undefined
        }
    };
    showTag(){
        document.getElementById("instaFlollowId").style.display = "block";
        document.querySelector('#instaFlollowId').classList.toggle('animate__fadeInRight');
    }
    hideTag(){
        document.querySelector('#instaFlollowId').classList.toggle('animate__fadeOutRight');
    }
    showInfo(){
        document.getElementById("intaFollow").style.display = "block";
        document.getElementById("instaFollow-bio").style.display = "block";
        document.querySelector('#intaFollow').classList.toggle('animate__fadeInRight');
    }
    hideInfo(){
        document.querySelector('#intaFollow').classList.toggle('animate__fadeOutRight');
    }
    disappersInfo(time){
        setTimeout(() => {
            document.querySelector('#intaFollow').classList.toggle('animate__fadeOutRight');
            document.querySelector('#intaFollow').classList.toggle('animate__fadeInRight');
        },time);
    }
    toggleTag(){
        document.querySelector('#intaFollow').classList.toggle('animate__fadeInRight');
        document.querySelector('#instaFlollowId').classList.toggle('animate__fadeOutRight');
    }
    toggleInfo(){
        document.querySelector('#intaFollow').classList.toggle('animate__fadeOutRight');
        document.querySelector('#instaFlollowId').classList.toggle('animate__fadeInRight');
        this.disappersInfo(5000)
    }
    auto(){
        document.getElementById("intaFollow").style.display = "block";
        document.getElementById("instaFollow-bio").style.display = "block";
        document.getElementById("instaFlollowId").style.display = "block";

        this.disappersInfo(3000);
        document.getElementById("instaFlollowId").addEventListener("click", ()=>{
            this.toggleInfo();

        });

    }
    insert(){
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',this.html());
    }
    html(){
        var style="position:fixed;bottom:10px;right:10px;background-color:black;padding:0px;color:white;padding-right: 20px;border-radius:10px;font-size:11px;";
        var bio = this.profile.biography.split('\n');
        var p=' ';
        p+=`<b>${this.profile.full_name}</b> ( @${this.profile.username} )<br>`;
        bio.forEach(element => {
            p+=`
            ${element}
            `;
        });
        return ` 
        <div>
        <img src="${this.profile.profile_pic_url}" id="instaFlollowId" 
        style="width:55px;border-radius:10px;position:fixed;bottom:10px;right:10px;padding:0px;color:white;border-radius:10px;font-size:11px;display:none;" 
        class="animate__animated">
        <a type="a" id="intaFollow" target="_blank" href="https://www.instagram.com/${this.username}/" style="${style};display:none;"  class="animate__animated">
        <img src="${this.profile.profile_pic_url}" style="width:55px;border-radius:10px;">
        <div id="instaFollow-bio" style="max-width:400px;float:right;display:none;margin-left:10px;margin-top:3px;">${p}</div>
        </a>
        </div>
        `;
    }
}

  
