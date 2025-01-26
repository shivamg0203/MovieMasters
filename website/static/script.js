
if(document.location.href=='http://127.0.0.1:5000/login' || location.href=='http://localhost:5000/login') {     //for login page
    var password = document.querySelector( "#loginexampleFormControlInput1" );
    var t = document.querySelector( "#exampleCheck1" );

    // NOTE: The "(input)" event doesn't work on checkboxes in Safari or IE. As such,
    // I'm using the "(click)" event to make this works cross-browser.
    t.addEventListener( "click", handleToggleClick, false );

    // I handle the toggle click, changing the TYPE of password input.
    function handleToggleClick( event ) {
        if ( this.checked ) {
            password.type = "text";

        } else {
            password.type = "password";
        }
    }
    document.getElementById('loginbtn').disabled=true;
    function loginValidate(){
        if(document.getElementById('loginusername').value=='' || document.getElementById('loginexampleFormControlInput1').value==''){
            document.getElementById('loginbtn').disabled=true;
        }
        else{
            document.getElementById('loginbtn').disabled=false;
        }
    }
}
else if (location.href=='http://127.0.0.1:5000/' || location.href=='http://localhost:5000/'){
    let k =document.getElementById('forinfo')
    document.getElementsByClassName("btn")[0].disabled=true
    console.log("signup page")
    var formValidate = function() {
        if (document.getElementById("signuppassword").value ==
          document.getElementById("signupconfirmpassword").value && document.getElementById("signuppassword").value !='') {
            k.style.color = "Green";
            k.innerHTML = "Passwords match!"
            if (document.getElementById("username").value!='' && document.getElementById("signupemail").value!=''){
                if(passlen() ){   //if password conditions match then enable submit button
                    document.getElementsByClassName("btn")[0].disabled=false
                }
                
            }
            else{
                document.getElementsByClassName("btn")[0].disabled=true
            }
        }else {
          k.style.color = "Red";
          k.innerHTML = "Passwords do NOT match!"
          document.getElementsByClassName("btn")[0].disabled=true
        }
      }

    var passlen = function(){
        let inputtxt=document.getElementById('signuppassword');
        // let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        let passw = /^.{8,10}$/;

        if(!(inputtxt.value.match(passw))) 
        {   
            document.getElementsByClassName("btn")[1].disabled=true
            document.getElementById('infobutton').innerHTML='Must be at least 8 chars long.';
            document.getElementById('infobutton').style.fontSize='14px';
            document.getElementById('infobutton').style.color='red';


       }
        else
        { 
            document.getElementById('infobutton').innerHTML='Valid Password'
            
            document.getElementById('infobutton').style.color='green';
            setTimeout(function(){
                document.getElementById('infobutton').innerHTML='';
            },2000);
            
            return true;
            
        }
    }}
else if (location.href.includes('http://127.0.0.1:5000/home') || location.href.includes('http://localhost:5000/home')){    
    function scrollcarousel(a,b,c,d,e,n) {
    const carousel = document.querySelector(a);
    const container = document.querySelector(b);
    const cards = document.querySelectorAll(c);
    const leftButton = document.querySelector(d);
    const rightButton = document.querySelector(e);
    
    let containerWidth = 0;
    let cardWidth = 0;
    let cardsVisible = 0;
    let currentPosition = 0;
    
    function updateVariables() {
        containerWidth = document.querySelector(b).offsetWidth;
        cardWidth = cards[0].offsetWidth;
        cardsVisible = Math.min(Math.floor(containerWidth / cardWidth),n);// for entire page length 
    }
    
    function updateButtons() {
        if (currentPosition === 0) {
        leftButton.disabled = true;
        console.log('left disabled', currentPosition)
        } else {
        leftButton.disabled = false;
        }
        if (currentPosition + Math.floor(containerWidth / cardWidth) >= cards.length) {
        rightButton.disabled = true;
        console.log('right disabled',currentPosition)
        } else {
        rightButton.disabled = false;
        }
    }
    
    function handleLeftClick() {
        currentPosition -= cardsVisible;
        if (currentPosition < 0) {
        currentPosition = 0;
        }
        document.querySelector(b).style.transform = `translateX(-${currentPosition * (cardWidth+20)}px)`;
        updateButtons();
    }
    
    function handleRightClick() {
        console.log(currentPosition)
        currentPosition += cardsVisible;
        console.log(currentPosition)
        console.log(cards.length)


        if (currentPosition + cardsVisible > cards.length) {
        currentPosition = cards.length - cardsVisible;
        }
        document.querySelector(b).style.transform = `translateX(-${currentPosition * (cardWidth+20)}px)`;
        updateButtons();
    }
    
    updateVariables();
    updateButtons();
    
    leftButton.addEventListener('click', handleLeftClick);    
    rightButton.addEventListener('click', handleRightClick);
    
    window.addEventListener('resize', () => {
        updateVariables();
        updateButtons();
        container.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    });
    }
    scrollcarousel('.carousel','.carousel-container','.card','.carousel-button.left','.carousel-button.right',1)
    scrollcarousel('.second-carousel','.second-carousel-container','.second-card','.second-carousel-button.left','.second-carousel-button.right',3)
       
}
    

     

