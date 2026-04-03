const Orders =()=>{
  return(
    <div class="max-w-4xl mx-auto m-8 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm font-sans">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Your Orders</h1>
      <p class="text-sm text-gray-500 mt-1">Check the status of recent orders and manage returns.</p>
    </div>
    <button class="bg-white px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      Filter Orders
    </button>
  </div>

  <div class="space-y-4">
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex gap-4 items-center">
          <div class="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Order #TW-9982</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Delivered</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mt-1">Ultra-Slim Mechanical Keyboard</h3>
            <p class="text-sm text-gray-500">Ordered on March 4, 2026</p>
          </div>
        </div>
        <div class="flex items-center gap-4 sm:text-right sm:flex-col sm:gap-1">
          <span class="text-xl font-bold text-gray-900">$129.99</span>
          <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">View Details</a>
        </div>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex gap-4 items-center">
          <div class="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Order #TW-9941</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">In Transit</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mt-1">Noise Cancelling Earbuds</h3>
            <p class="text-sm text-gray-500">Ordered on Feb 28, 2026</p>
          </div>
        </div>
        <div class="flex items-center gap-4 sm:text-right sm:flex-col sm:gap-1">
          <span class="text-xl font-bold text-gray-900">$89.00</span>
          <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Track Package</a>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}
export default Orders