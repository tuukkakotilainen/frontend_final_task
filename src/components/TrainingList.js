import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';


export default function TrainingList () {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(_ => getTrainings())
        .catch(err => console.error(err))
        }
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer'
        },
        {
            Cell: row => (<Button size='small' color='secondary' onClick={() => deleteTraining(row.original.links[0].href)}>Delete</Button>)
        }
    ]

    return(
       <div>
           Sort items by clikcing header.
         <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns}/>
         
       </div> 
    )
}