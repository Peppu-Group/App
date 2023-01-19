import React from "react";
import logo from "../assets/IMG_2437.png"





const Signin = () =>{
    return (
        <body id="signin"> 
        <header >
    <img src= {logo}/>
    <span>Welcome back!</span>
</header>
        <main>    

<section className="start">
    <h3>Sign in</h3>
    <p>New here?<span>Get Started for free</span></p>
</section>
<section className="login">
    <button type="summit">Login</button>
    <br />
    <p><span>----------</span>or<span>-----------</span></p>
    <a href='#'><span className='g-in-google'>G</span ><span className='o-in-google'>
    o</span><span className='onext-in-google'>o</span><span className='g-in-google'>g</span><span className='l-in-google'>l
    </span ><span className='e-in-google'>e</span></a>

</section>
</main> 
</body>
    )
}
export default Signin