'use client';
import React from 'react'
import { fetchProperty } from '@/utils/requests';
import { useEffect,useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarButton from '@/components/BookmarButton';
import ShareButton from '@/components/ShareButton';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import PropertyContactForm from '@/components/PropertyContactForm';

const PropetyPage = () => {
  const {id}= useParams();

  const [property,setProperty]=useState(null);
  const [loading,setLoading]=useState(null);

  useEffect(()=>{
    const fetchPropertyData=async()=>{
      if(!id) return;
      try{
        const property=await fetchProperty(id);
        setProperty(property);
      }
      catch(error){
        console.log('Error fetching property',error);
      }
      finally{
        setLoading(false);
      }
    }
    if(property===null){
      fetchPropertyData();
    }
  },[id,property]);

  if(!property && !loading){
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    )
  }
  return (
    <>
    {loading && <Spinner loading={loading}/>}
    {!loading && property &&(<>
    <PropertyHeaderImage image={property.images[0]}/>
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="fas fa-arrow-left mr-2"/> Back to Properties
        </Link>
      </div>
    </section>

     <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          
          <PropertyDetails property={property}/>
          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">       
            <BookmarButton property={property}/>
            <ShareButton property={property}/>            

            {/* <!-- Contact Form --> */}
            <PropertyContactForm property={property}/>
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images}/>
    </>

    )}
    </>
  )
}

export default PropetyPage