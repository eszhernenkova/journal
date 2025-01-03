
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'

import './App.scss'

import { useLocalStorage } from './components/hooks/use-localstorage.hook'

function mapItems(items) {
  if(!items) {
    return [];
  }

  return items.map(i => ({
    ...i,
    date: new Date(i.date),
  }));
}


function App() {
  const [ items, setItems ] = useLocalStorage('data',[]);

  const addItem = item => {
    setItems([ ...mapItems(items), {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: Math.max(...(items || []).map(i => i.id), 0) + 1
    }]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton/>
        <JournalList items={mapItems(items)} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
    </div>
  )
}

export default App
