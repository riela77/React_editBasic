import logo from './logo.svg';
import './App.css';
import BmiEvent from './event/kimBMIEvent';
import MyKeyEvent from './event/kimKeyEvent';
import MyMouseEvent from './event/kimMouseEvent';
import KimPopupMenu2 from './event/kimPopupMenu2';
import KimHookFourth from './hook/kimHookFourth';
import MyResizeEvent from './event/kimResizeEvent';
import MySocketClint from './socket/mySocketClint';
import MyHookThird from './hook/kimHookThird';

function App() {
  return (
    <div className="App">
      <BmiEvent/>
      <MyKeyEvent/>
      <MyMouseEvent/>
      <MyResizeEvent/>
      <KimHookFourth />
      <MyHookThird />
      <KimPopupMenu2 />
      <MySocketClint />

    </div>
  );
}

export default App;
