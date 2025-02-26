export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="dashboard-container">
        {children} {/* No Header here */}
      </div>
    );
  }
  