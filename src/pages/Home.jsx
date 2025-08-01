import '/src/assets/styleSheets/Home.css'

const Home = () => {
    return (
        <div className="heroBody">
            <section className="title">
                <section className="text">
                    <h2>Welcome to SBL</h2>
                    <h3>an online <br/><i>Simple Book Library</i></h3>
                </section>
                <img src="/logo/FavIcon.svg" alt="logo" className="backImage"/>
            </section>
        </div>
    )
}
export default Home;