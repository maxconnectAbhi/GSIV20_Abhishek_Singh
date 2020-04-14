import { createAppContainer, createStackNavigator } from 'react-navigation';
import MovieList from '../../screens/MovieList';
import MovieDetails from '../../screens/MovieDetails';
import { DISABLED, GRAY } from '../common/Constants';

const AppNav = createStackNavigator(
  {
    List: {
      screen: MovieList, navigationOptions: {
        header: null,
      }
    },
    Details: { screen: MovieDetails },
  }, {
  initialRouteName: 'List',
  defaultNavigationOptions: {
    headerTintColor: GRAY,
    headerBackTitleStyle: { color: GRAY },
    headerStyle: {
      backgroundColor: DISABLED,
    }
  },
}
);

export default createAppContainer(AppNav)