import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

export default function CustomerList () {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('customer added')
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('customer updated')
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('customer deleted')
            setOpen(true)
        })
        .catch(err => console.error(err))
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Cell: row => (<EditCustomer customer={row.original} updateCustomer={updateCustomer}/>)
        },
        {
            Cell: row => (<Button size='small' color='secondary' onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>)
        }
    ]

    return(
       <div>
           <AddCustomer addCustomer={addCustomer} />
           Sort items by clikcing header.
         <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns}/>
         <Snackbar
            open={open}
            autoHideDuration={3000}
            onCLose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            />
       </div> 
    )
}