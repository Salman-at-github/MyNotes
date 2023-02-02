import React from 'react';
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (<>
    <div className='homecont'>
      <div>
        <h2 className='hhome'>
          MyNotes - Your Notebook on the Cloud
        </h2>
      </div>
      <Notes showAlert={showAlert}/>
      <div>
      </div>
    </div>
        </>)
}

export default Home
