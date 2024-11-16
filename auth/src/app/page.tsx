'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
	const { getToken } = useAuth();
	const [data, setData] = useState<any>();

	const apiCall = async (e: any) => {
		e.preventDefault();
		try {
			const token = await getToken();
			const res = await axios.get('http://localhost:5432/api/v1/login', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			});

			if (token) setData([{ data: res.data }, token]);
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				window.location.href = 'http://localhost:3000/sign-in';
			} else {
				console.error('API call failed:', error);
			}
		}
	};

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				{data && <p className='max-w-[70vw]'>{JSON.stringify(data)}</p>}

				<div className='flex gap-4 items-center flex-col sm:flex-row'>
					<button onClick={apiCall}>Click Me To Call API</button>
					<UserButton />
				</div>
			</main>
		</div>
	);
}
