import '../assets/styleSheets/About.css'

const About = () => {
    return (
        <div>
            <section className="aboutContent">
                <div>
                    <h4>The project:</h4>
                    <p>
                        SBL, or Simple Book Library, is a platform to allow readers to visualize the best-selling
                        books of the week but also to search for information about any book.
                    </p>
                </div>
                <div>
                    <h4>How it works:</h4>
                    <p>
                        I'm using public data gathered through:<br/>
                        - a New York Times API (for a list of best-selling books)<br/>
                        - Google books API (for information of any book)<br/>
                        The data received through these API are being mapped, cached temporarily
                        and showed directly to the final user
                    </p>
                </div>
                <div>
                    <h4>The idea:</h4>
                    <p>
                        This projects was born to learn while doing, and it surely isn't done yet! <br/>
                        I like to read and i took this little passion of mine and transformed in a project i could
                        give to the people <br/>
                        Many more features are being developed and while i do so, I'm growing and learning as a
                        real developer<br/>
                        Because: <i><b>the best way of learning is by making mistakes, understand them and solve
                        them</b></i>
                    </p>
                </div>
            </section>
            <img src="/logo/FavIcon.svg" alt="logo" className="backImage"/>
        </div>
    )
}

export default About;