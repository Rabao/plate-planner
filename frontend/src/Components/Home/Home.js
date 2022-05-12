import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Recipes from './RecipesList';

function Home(props) {
    return(
        <div>
            <Link to='/recipes'>Recipes</Link>
            <Switch>
                <Route path='/recipes' component={() => <Recipes/>}/>
            </Switch>
        </div>
    )
}

export default Home;