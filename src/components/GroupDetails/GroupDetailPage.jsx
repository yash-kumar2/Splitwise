import { useEffect,useState } from 'react';
import React from 'react';
import ExpenseCard from '../Expenses/ExpenseCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
const GroupDetailPage = () => {
  const token = useSelector((state) => state.auth.token);
  const BASEURL='http://localhost:3000'
  let { id } = useParams();
  console.log(id)
  const fetchData = async () => {
    
    try {
      const result = await axios
        .get(`${BASEURL}/groups/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
        console.log(result)
      setExpenses(result.expenses)
      setGroup(result)
      console.log(result.friends)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
      fetchData()
  },[id])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  // Hardcoded group and expenses data for testing
  // const group = {
    
  //   id: '1',
  //   name: 'Family Vacation',
  //   members: [
  //     { id: '1', name: 'Alice', amountOwed: 150 },
  //     { id: '2', name: 'Bob', amountOwed: -100 },
  //     { id: '3', name: 'Charlie', amountOwed: 50 },
  //   ],
  // };
  const [expenses,setExpenses]=useState([])
  const [group,setGroup]=useState([])

  // const expenses = [
  //   {
  //     id: '1',
  //     description: 'Hotel Booking',
  //     createdAt: '2023-03-22T12:34:56Z',
  //     amount: 300,
  //     for: { name: 'Bob' },
  //   },
  //   {
  //     id: '2',
  //     description: 'Flight Tickets',
  //     createdAt: '2023-03-15T08:12:34Z',
  //     amount: -200,
  //     for: { name: 'Alice' },
  //   },
  //   {
  //     id: '3',
  //     description: 'Dinner',
  //     createdAt: '2023-04-10T18:00:00Z',
  //     amount: 100,
  //     for: { name: 'Charlie' },
  //   },
  //   {
  //     id: '4',
  //     description: 'Museum Tickets',
  //     createdAt: '2023-04-05T14:00:00Z',
  //     amount: -150,
  //     for: { name: 'Alice' },
  //   },
  // ];

  // Sort expenses globally by createdAt date
  const sortedExpenses = [...expenses].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Group and sort by month
  const groupExpensesByMonth = sortedExpenses.reduce((acc, expense) => {
    const month = new Date(expense.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(expense);
    return acc;
  }, {});

  // Get sorted months array and reverse it
  const sortedMonths = Object.keys(groupExpensesByMonth).sort((a, b) => {
    const dateA = new Date(groupExpensesByMonth[a][0].createdAt);
    const dateB = new Date(groupExpensesByMonth[b][0].createdAt);
    return dateA - dateB;
  }).reverse();

  // Sort expenses within each month by createdAt date in descending order
  Object.keys(groupExpensesByMonth).forEach((month) => {
    groupExpensesByMonth[month].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  return (
    
    <div className="container mx-auto  p-4 overflow-auto">
    
      {group.friends && (

        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-4">{group.description}</h1>
          <h2 className="text-xl font-semibold mb-2">Owed Amounts</h2>
          
          <ul className="mb-4">
            {group.friends.map((member) => (
              <li key={member.id} className="mb-1">
                <span className={member.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                  {member.amount > 0
                    ? `${member.name} owes you ₹${member.amount}`
                    : `You owe ${member.name} ₹${-member.amount}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      <div>
        {sortedMonths.map((month) => (
          <div key={month} className="mb-6">
            <h3 className="text-lg font-bold mb-2">{month}</h3>
            {groupExpensesByMonth[month].map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </div>
        ))}
      </div>
      <button className="fixed bottom-[100px] right-10 px-4 py-4 m-3  rounded-xl bg-blue-100" onClick={showModal} >
  Add Expense
</button>
<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
centered >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </div>
  );
};

export default GroupDetailPage;
