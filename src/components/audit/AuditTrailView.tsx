import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User as UserIcon, 
  ArrowUpDown, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  RotateCcw,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuditEvent, EventType } from '../../types';

export const AuditTrailView: React.FC = () => {
  const { auditEvents, cases, setActiveCaseId, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCaseRef, setSelectedCaseRef] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return auditEvents
      .filter((evt) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'case' && !evt.eventType.includes('case') && !evt.eventType.includes('draft')) return false;
          if (selectedCategory === 'review' && !evt.eventType.includes('record') && !evt.eventType.includes('discrepancy') && !evt.eventType.includes('finding')) return false;
          if (selectedCategory === 'senior' && !evt.eventType.includes('submitted') && !evt.eventType.includes('approval') && !evt.eventType.includes('return') && !evt.eventType.includes('evidence')) return false;
          if (selectedCategory === 'report' && !evt.eventType.includes('report') && !evt.eventType.includes('integrity')) return false;
        }

        // Case reference filter
        if (selectedCaseRef !== 'all' && evt.caseReference !== selectedCaseRef) {
          return false;
        }

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = evt.eventTitle.toLowerCase().includes(q);
          const matchDetails = evt.eventDetails.toLowerCase().includes(q);
          const matchActor = evt.actorName.toLowerCase().includes(q);
          const matchCase = evt.caseReference.toLowerCase().includes(q);
          const matchOutcome = evt.statusOutcome?.toLowerCase().includes(q);
          if (!matchTitle && !matchDetails && !matchActor && !matchCase && !matchOutcome) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime() || 0;
        const timeB = new Date(b.timestamp).getTime() || 0;
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [auditEvents, searchQuery, selectedCategory, selectedCaseRef, sortOrder]);

  const handleOpenCase = (caseRef: string) => {
    const matched = cases.find((c) => c.reference === caseRef);
    if (matched) {
      setActiveCaseId(matched.id);
      setActiveTab('cases');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Event Title', 'Event Details', 'Actor', 'Role', 'Case Reference', 'Outcome'];
    const rows = filteredEvents.map((e) => [
      `"${e.timestamp}"`,
      `"${e.eventTitle}"`,
      `"${e.eventDetails.replace(/"/g, '""')}"`,
      `"${e.actorName}"`,
      `"${e.actorRole}"`,
      `"${e.caseReference}"`,
      `"${e.statusOutcome || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jomi_guard_audit_trail_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEventBadge = (type: EventType) => {
    switch (type) {
      case 'approval_granted':
      case 'report_issued':
      case 'integrity_verified':
        return { icon: CheckCircle2, color: 'text-[#087F79] bg-[#E6F5F4] border-[#087F79]/30' };
      case 'returned_for_correction':
      case 'discrepancy_flagged':
        return { icon: AlertCircle, color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'screening_submitted':
      case 'evidence_requested':
        return { icon: Clock, color: 'text-blue-700 bg-blue-50 border-blue-200' };
      default:
        return { icon: FileText, color: 'text-[#14263A] bg-[#F4F7FA] border-[#D6DEE7]' };
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header & Purpose Description */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#14263A] text-white">
                <History className="w-5 h-5 text-[#087F79]" />
              </div>
              <h1 className="text-xl font-bold text-[#14263A] tracking-tight">
                Audit Trail
              </h1>
            </div>
            <p className="text-xs text-[#526174] mt-1.5 leading-relaxed max-w-3xl">
              Chronological record of administrative events, review evaluations, and approvals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold text-[#14263A] bg-[#F4F7FA] hover:bg-[#E6F5F4] border border-[#D6DEE7] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#087F79]" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3.5 py-2 text-xs font-semibold text-[#14263A] bg-[#F4F7FA] hover:bg-white border border-[#D6DEE7] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Toggle chronological order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#526174]" />
              <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar (Clean toolbar spanning full width) */}
        <div className="mt-6 pt-5 border-t border-[#D6DEE7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Field */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#526174]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title, actor, case ref, or narrative..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            >
              <option value="all">All Event Categories</option>
              <option value="case">Case Intake & Drafts</option>
              <option value="review">Field Review & Findings</option>
              <option value="senior">Senior Officer Oversight</option>
              <option value="report">Reports & Integrity</option>
            </select>
          </div>

          {/* Case Reference Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCaseRef}
              onChange={(e) => setSelectedCaseRef(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            >
              <option value="all">All Cases</option>
              {cases.map((c) => (
                <option key={c.id} value={c.reference}>
                  {c.reference} ({c.mouza})
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="lg:col-span-1 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedCaseRef('all');
              }}
              className="w-full sm:w-auto px-2.5 py-2 text-xs text-[#526174] hover:text-[#172638] hover:bg-[#F4F7FA] border border-transparent hover:border-[#D6DEE7] rounded-lg flex items-center justify-center gap-1 transition-colors"
              title="Reset search and filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="lg:hidden">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Redesigned Wide Desktop Table / Chronological List */}
      <div className="w-full bg-white rounded-xl border border-[#D6DEE7] shadow-xs overflow-hidden">
        {/* Table Column Header (Flexible Proportions: Details 50%, Actor 18%, Case Ref 14%, Date 18%) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#F4F7FA] border-b border-[#D6DEE7] text-[11px] font-bold text-[#526174] uppercase tracking-wider">
          <div className="col-span-6">Event Details</div>
          <div className="col-span-2">Actor & Role</div>
          <div className="col-span-2">Case Reference</div>
          <div className="col-span-2 text-right">Timestamp</div>
        </div>

        {/* Event Rows */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex p-3 rounded-full bg-[#F4F7FA] text-[#526174] mb-3 border border-[#D6DEE7]">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-[#172638]">No audit records match the criteria</h3>
            <p className="text-xs text-[#526174] mt-1">Try adjusting the search query or category filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#D6DEE7]">
            {filteredEvents.map((event) => {
              const badge = getEventBadge(event.eventType);
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={event.id}
                  className="p-4 sm:px-6 hover:bg-[#F4F7FA]/60 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start">
                    
                    {/* Event & Operational Details (Full readable natural sentence, no 2-word wrapping!) */}
                    <div className="md:col-span-6 flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 border ${badge.color}`}>
                        <BadgeIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-xs font-bold text-[#14263A] tracking-tight">
                            {event.eventTitle}
                          </h4>
                          {event.statusOutcome && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F4F7FA] text-[#526174] border border-[#D6DEE7]">
                              {event.statusOutcome}
                            </span>
                          )}
                        </div>
                        {/* Event Details sentence wraps naturally across full column width */}
                        <p className="text-xs text-[#172638] leading-relaxed break-normal">
                          {event.eventDetails}
                        </p>
                      </div>
                    </div>

                    {/* Actor Column */}
                    <div className="md:col-span-2 flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 rounded-full bg-[#14263A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {event.actorName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="font-semibold text-[#172638] block truncate">
                          {event.actorName}
                        </span>
                        <span className="text-[10px] text-[#526174] block capitalize">
                          {event.actorRole.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Case Reference Column */}
                    <div className="md:col-span-2 flex items-center">
                      {event.caseReference && event.caseReference !== 'SYSTEM-AUTH' ? (
                        <button
                          type="button"
                          onClick={() => handleOpenCase(event.caseReference)}
                          className="font-mono text-xs font-semibold text-[#087F79] hover:text-[#066661] bg-[#E6F5F4] hover:bg-[#d0ecea] px-2.5 py-1 rounded border border-[#087F79]/20 flex items-center gap-1.5 transition-colors"
                          title="Open Case File"
                        >
                          <span>{event.caseReference}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="font-mono text-[11px] text-[#526174] px-2 py-0.5 bg-[#F4F7FA] rounded border border-[#D6DEE7]">
                          {event.caseReference || 'SYSTEM'}
                        </span>
                      )}
                    </div>

                    {/* Timestamp Column */}
                    <div className="md:col-span-2 md:text-right text-xs text-[#526174] flex md:flex-col items-center md:items-end justify-between md:justify-center">
                      <span className="font-mono text-[11px] text-[#172638]">
                        {event.timestamp.split(' ')[0]}
                      </span>
                      <span className="font-mono text-[10px] text-[#526174]">
                        {event.timestamp.split(' ')[1] || ''}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Summary Bar */}
        <div className="p-4 bg-[#F4F7FA] border-t border-[#D6DEE7] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#526174]">
          <span className="font-medium">
            Showing <strong className="text-[#172638]">{filteredEvents.length}</strong> recorded audit event{filteredEvents.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </div>
  );
};
