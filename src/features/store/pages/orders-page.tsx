import { useEffect, useState } from 'react';

import type { TabsProps } from 'antd';
import { Pagination, Spin, Tabs, Tag } from 'antd';

import onAxios from '../utils';

// import onAxios from '../utils/axiosIntstance';

/* ---------- Types ---------- */
interface OrderProduct {
   product_id: number;
   name: string;
   quantity: number;
   price_per_unit: number;
   subtotal: number;
}

type OrderStatus = 'pending' | 'completed' | 'cancelled';

type StatusFilter = OrderStatus | 'all';

interface Order {
   id: number;
   user_id: number;
   total_price: number;
   status: OrderStatus;
   address: string;
   phone: string;
   created_at: string;
   products: OrderProduct[];
}

interface Meta {
   current: number;
   last: number;
}

interface OrderHistoryResponse {
   data: Order[];
   meta: {
      current_page: [number, number] | number[];
      last_page: [number, number] | number[];
   };
}

/* ---------- Constants ---------- */
const STATUS_COLORS: Record<OrderStatus, string> = {
   pending: 'gold',
   completed: 'green',
   cancelled: 'red',
};

const PER_PAGE = 5;

/* ---------- Component ---------- */
const OrdersPage = () => {
   const [orders, setOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [meta, setMeta] = useState<Meta>({ current: 1, last: 1 });
   const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');

   /* ----- API call (Fetch Orders With Status Filterion) ----- */
   const fetchOrders = (status: StatusFilter = 'all', page: number = 1) => {
      setLoading(true);
      let url = `/api/e-commerce/orders/history?page=${page}&per_page=${PER_PAGE}`;
      if (status !== 'all') url += `&status=${status}`;

      onAxios
         .get<OrderHistoryResponse>(url)
         .then((res) => {
            setOrders(res.data.data);
            setMeta({
               current: Array.isArray(res.data.meta.current_page)
                  ? res.data.meta.current_page[0]
                  : res.data.meta.current_page,
               last: Array.isArray(res.data.meta.last_page)
                  ? res.data.meta.last_page[0]
                  : res.data.meta.last_page,
            });
         })
         .catch((err) => console.error('Error fetching orders', err))
         .finally(() => setLoading(false));
   };

   /* ----- Effects ----- */
   useEffect(() => {
      fetchOrders(activeStatus, 1);
   }, [activeStatus]);

   /* ----- Handlers ----- */
   const handleTabChange: TabsProps['onChange'] = (key) => {
      setActiveStatus(key as StatusFilter);
   };

   const handlePageChange = (page: number) => {
      fetchOrders(activeStatus, page);
   };

   /* ----- Tabs items ----- */
   const items: TabsProps['items'] = [
      { key: 'all', label: 'All' },
      { key: 'pending', label: 'Pending' },
      { key: 'completed', label: 'Completed' },
      { key: 'cancelled', label: 'Cancelled' },
   ];

   return (
      <section className='flex min-h-screen flex-col'>
         <div className='container mx-auto flex-grow px-4 py-8'>
            <h1 className='mb-6 text-2xl font-bold'>My Orders</h1>

            {/* Tabs */}
            <Tabs
               defaultActiveKey='all'
               activeKey={activeStatus}
               items={items}
               onChange={handleTabChange}
            />

            {/* Content (Order Card) */}
            {loading ? (
               <div className='flex min-h-[200px] items-center justify-center'>
                  <Spin tip='Loading Orders...' size='large' />
               </div>
            ) : orders.length === 0 ? (
               <p>No orders found.</p>
            ) : (
               <>
                  <div className='space-y-6'>
                     {orders.map((order) => (
                        <div
                           key={order.id}
                           className='rounded-xl border bg-white p-4 shadow-sm'
                        >
                           <div className='mb-2 flex items-center justify-between'>
                              <div>
                                 <h2 className='text-lg font-semibold'>
                                    Order #{order.id}
                                 </h2>
                                 <p className='text-sm text-gray-500'>
                                    {order.created_at}
                                 </p>
                              </div>

                              <Tag
                                 color={STATUS_COLORS[order.status]}
                                 className='uppercase'
                              >
                                 {order.status}
                              </Tag>
                           </div>

                           <p className='mb-1 text-sm'>
                              <strong>Address:</strong> {order.address}
                           </p>
                           <p className='mb-1 text-sm'>
                              <strong>Total:</strong> {order.total_price} EGP
                           </p>

                           <p className='mb-1 text-sm'>
                              <strong>Phone Number:</strong> {order.phone}
                           </p>

                           <div className='mb-2 text-sm'>
                              <strong>Products:</strong>{' '}
                              {order.products
                                 .map(
                                    (p) =>
                                       `${p.quantity} × ${p.name} = ${p.subtotal} EGP`
                                 )
                                 .join(', ')}
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className='mt-8 text-center'>
                     <Pagination
                        current={meta.current}
                        total={meta.last * PER_PAGE}
                        onChange={handlePageChange}
                     />
                  </div>
               </>
            )}
         </div>
      </section>
   );
};

export default OrdersPage;
