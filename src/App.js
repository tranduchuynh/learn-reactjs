// import styled from 'styled-components';
import Header from 'components/Header';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/product';
// import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
import './App.css';


// css in jsff
// const Title = styled.h1`
//   text-align: center;
//   font-weight: bold;

//   color: ${props => props.color || 'green'}
// `

function App() {

  useEffect(() => {
    const fecthProducts = async () => {
      const params = {
        _limit: 10,
      }
      const productList = await productApi.getAll(params);
      console.log(productList)
    }
    fecthProducts();
  }, [])

  return (
    <div className="App">
      {/* <Title color="goldenrod" >HEADING</Title> */}
      <Header />

      {/* <p>
        <Link to="/todos" >Todos</Link>
      </p>
      <p>
        <Link to="/albums" >Albums</Link>
      </p> */}

      {/* <p>
        <NavLink to="/todos">Todos</NavLink>
      </p>
      <p>
        <NavLink to="/albums">Albums</NavLink>
      </p> */}

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:id" to="/post/:id" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />

        {/* <Route component={NotFound} /> */}
      </Switch>

      {/* <Route path="/todos" component={TodoFeature} />
      <Route path="/todos" component={TodoFeature} />
      <Route path="/albums" component={AlbumFeature} /> */}
      {/* <div>Footer</div> */}
    </div>
  );
}

export default App;
