

import AdminProtectedRoute from '@/components/ProductedRoute'
import SideBar from '@/components/SideBar';

const admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AdminProtectedRoute>
         <div className="flex flex-col lg:flex-row min-h-screen container mx-auto">
        <SideBar />
        <main className="flex-1 overflow-auto mt-5 md:mt-0 md:border-t border-gray-800">
          {children}
        </main>
      </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default admin