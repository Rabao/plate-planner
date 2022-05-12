import {Switch, Route, Redirect, Link} from 'react-router-dom'

function Home(props) {
    return(
        <div>
            <Link to='/recipes'>Recipes</Link><br/>
            <Link to='/groceries'>Groceries</Link><br/>
            <Link to='/mealplans'>Meal Plans</Link>
        </div>
    )
}

export default Home;