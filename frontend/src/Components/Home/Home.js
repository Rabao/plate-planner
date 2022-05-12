import {Switch, Route, Redirect, Link} from 'react-router-dom'

function Home(props) {
    return(
        <div>
            <Link to='/recipes'>Recipes</Link>
        </div>
    )
}

export default Home;