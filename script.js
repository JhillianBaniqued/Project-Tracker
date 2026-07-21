  // ---------- DATA ----------
  const projects = [
    {
      id:'p1', name:'Project Name', details:'Short description of the project goes here.',
      lead:'Jordan Cruz', progress:62, status:'inprogress', statusLabel:'In Progress', launch:'Sept 12, 2026', archived:false,
      tasks:{
        planning:[
          {id:'t1', name:'Recent task — define scope', assignee:'Jordan', priority:'high', completed:true, status:'completed', progress:100, deadline:'2026-07-15', remarks:'Approved by stakeholders'},
          {id:'t2', name:'Set milestones and timeline', assignee:'Mia', priority:'medium', completed:false, status:'inprogress', progress:60, deadline:'2026-07-25', remarks:''},
          {id:'t3', name:'Confirm budget with stakeholders', assignee:'Jordan', priority:'low', completed:false, status:'inprogress', progress:0, deadline:'2026-08-02', remarks:''},
        ],
        design:[
          {id:'t4', name:'Wireframe key screens', assignee:'Ana', priority:'high', completed:false, status:'inprogress', progress:40, deadline:'2026-07-28', remarks:'Homepage + dashboard completed'},
          {id:'t5', name:'Finalize color and type system', assignee:'Ana', priority:'medium', completed:false, status:'inprogress', progress:0, deadline:'2026-08-05', remarks:''},
        ],
        development:[
          {id:'t6', name:'Set up project repo', assignee:'Kevin', priority:'medium', completed:false, status:'completed', progress:100, deadline:'2026-07-18', remarks:''},
          {id:'t7', name:'Build core components', assignee:'Kevin', priority:'high', completed:false, status:'inprogress', progress:35, deadline:'2026-08-10', remarks:''},
          {id:'t8', name:'Connect API endpoints', assignee:'Sam', priority:'medium', completed:false, status:'inprogress', progress:0, deadline:'2026-08-15', remarks:''},
          {id:'t9', name:'QA pass', assignee:'Sam', priority:'low', completed:false, status:'inprogress', progress:0, deadline:'2026-07-08', remarks:''},
        ],
        testing:[
          {id:'t12', name:'Write regression test suite', assignee:'Sam', priority:'high', completed:false, status:'inprogress', progress:45, deadline:'2026-07-22', remarks:''},
          {id:'t13', name:'Cross-browser QA', assignee:'Mia', priority:'medium', completed:false, status:'inprogress', progress:0, deadline:'2026-07-10', remarks:''},
        ],
        deployment:[
          {id:'t14', name:'Set up CI/CD pipeline', assignee:'Kevin', priority:'high', completed:false, status:'completed', progress:100, deadline:'2026-07-05', remarks:''},
          {id:'t15', name:'Staging environment cutover', assignee:'Kevin', priority:'medium', completed:false, status:'inprogress', progress:0, deadline:'2026-08-12', remarks:''},
        ],
        maintenance:[
          {id:'t16', name:'Monitor error logs post-launch', assignee:'Jordan', priority:'low', completed:false, status:'inprogress', progress:0, deadline:'2026-09-01', remarks:''},
        ]
      },
      dashboard:{
        categories:[
          {label:'Planning', count:10, color:'#c47b3c'},
          {label:'Design', count:20, color:'#5b7fbf'},
          {label:'Maintenance', count:15, color:'#3a6b52'},
          {label:'Other', count:7, color:'#9ca3af'}
        ],
        progressRate:62,
        ganttDates:['Jul 20','Jul 21','Jul 22','Jul 23','Jul 24','Jul 25','Jul 26','Jul 27'],
        ganttRows:[
          {name:'Define scope', segs:[{from:0,to:2,status:'completed'}]},
          {name:'Wireframes', segs:[{from:1,to:4,status:'inprogress'}]},
          {name:'Core build', segs:[{from:3,to:8,status:'todo'}]},
          {name:'QA pass', segs:[{from:6,to:8,status:'todo'}]},
        ],
        employees:[
          {name:'Jordan', tasks:5, longest:false},
          {name:'Ana', tasks:3, longest:false},
          {name:'Kevin', tasks:7, longest:true},
          {name:'Sam', tasks:4, longest:false},
        ],
        overdue:[
          {task:'Sleep', deadline:'Jul 1', assignee:'Dam', daysOverdue:16},
        ],
        upcoming:[
          {task:'Eat', deadline:'Jul 16, 2026', employee:'Dam', progress:50},
        ]
      }
    },
    {
      id:'p2', name:'Project B', details:'Details ni Project B, dami eh!!',
      lead:'—', progress:38, status:'suspended', statusLabel:'Suspended', launch:'TBD', archived:false,
      tasks:{
        planning:[
          {id:'t10', name:'Interview stakeholders', assignee:'Rica', priority:'high', completed:false, status:'inprogress', progress:50, deadline:'2026-07-30', remarks:''},
        ],
        design:[],
        development:[
          {id:'t11', name:'Spike on data model', assignee:'Kevin', priority:'medium', completed:false, status:'inprogress', progress:20, deadline:'2026-08-03', remarks:''},
        ]
      },
      dashboard:{
        categories:[
          {label:'Planning', count:6, color:'#c47b3c'},
          {label:'Design', count:2, color:'#5b7fbf'},
          {label:'Maintenance', count:1, color:'#3a6b52'},
          {label:'Other', count:2, color:'#9ca3af'}
        ],
        progressRate:38,
        ganttDates:['Jul 20','Jul 21','Jul 22','Jul 23','Jul 24','Jul 25','Jul 26','Jul 27'],
        ganttRows:[
          {name:'Stakeholder interviews', segs:[{from:0,to:3,status:'inprogress'}]},
          {name:'Data model spike', segs:[{from:2,to:6,status:'todo'}]},
        ],
        employees:[
          {name:'Rica', tasks:2, longest:false},
          {name:'Kevin', tasks:3, longest:true},
        ],
        overdue:[],
        upcoming:[
          {task:'Data model spike', deadline:'Jul 30, 2026', employee:'Kevin', progress:20},
        ]
      }
    }
  ];

  const categoryMeta = {
    planning:{label:'Planning', dot:'planning', emoji:'🗒',},
    design:{label:'Design', dot:'design', emoji:'✎'},
    development:{label:'Development', dot:'development', emoji:'🖳'},
    testing:{label:'Testing', dot:'testing', emoji:'𖠞'},
    deployment:{label:'Deployment', dot:'deployment', emoji:'⌯✈︎'},
    maintenance:{label:'Maintenance', dot:'maintenance', emoji:'🔧'}
  };

  // The task modal's category dropdown is built from categoryMeta directly
  // (instead of a hardcoded, easily-drifting option list) so its emoji always
  // matches the ones shown beside category names everywhere else in the app.
  (function populateCategorySelect(){
    const sel = document.getElementById('f-category');
    if(!sel) return;
    sel.innerHTML = Object.keys(categoryMeta).map(key=>
      `<option value="${key}">${categoryMeta[key].emoji} ${categoryMeta[key].label}</option>`
    ).join('');
  })();

  // Outline trash-can icon used anywhere a delete action needs a trash
  // glyph, in place of the old 🗑 emoji (renders consistently across
  // platforms/fonts, and follows the button's own color via currentColor).
  const TRASH_ICON = `<svg class="trash-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;

  // ---------- PROGRESS / STATUS HELPERS ----------
  const STATUS_LABELS = {todo:'To Do', inprogress:'In Progress', completed:'Completed'};
  // Shortens a multi-word name for the table's Assigned To column, e.g.
  // "Mia Britty" -> "Mia B." — keeps the first name in full and reduces
  // every following word to its initial. Single-word names pass through.
  function toInitials(name){
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if(parts.length < 2) return parts[0] || '';
    return parts[0] + ' ' + parts.slice(1).map(w => w.charAt(0).toUpperCase() + '.').join(' ');
  }
  function allTasks(p){
    return Object.keys(categoryMeta).reduce((acc,cat)=>
      acc.concat((p.tasks[cat] || []).map(t=>{ t.category = cat; return t; })), []);
  }
  function computeProjectProgress(p){
    const tasks = allTasks(p);
    if(!tasks.length) return 0;
    const sum = tasks.reduce((s,t)=> s + (t.progress||0), 0);
    return Math.round(sum / tasks.length);
  }
  function isOverdue(t){
    if(!t.deadline || t.status==='completed') return false;
    const dl = new Date(t.deadline+'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    return dl < today;
  }
  function taskBucket(t){
    if(isOverdue(t)) return 'overdue';
    if(t.status==='completed') return 'completed';
    if(t.status==='inprogress') return 'inprogress';
    return 'todo';
  }

  // ---------- GENERIC CONFIRM MODAL ----------
  const confirmOverlay = document.getElementById('confirm-modal-overlay');
  let confirmCallback = null;
  function confirmAction(message, onConfirm){
    document.getElementById('confirm-message').textContent = message;
    confirmCallback = onConfirm;
    confirmOverlay.classList.add('active');
  }
  document.getElementById('confirm-ok-btn').addEventListener('click', ()=>{
    const cb = confirmCallback;
    confirmOverlay.classList.remove('active');
    confirmCallback = null;
    if(cb) cb();
  });
  document.getElementById('confirm-cancel-btn').addEventListener('click', ()=>{
    confirmOverlay.classList.remove('active');
    confirmCallback = null;
  });
  confirmOverlay.addEventListener('click', (e)=>{
    if(e.target === confirmOverlay){ confirmOverlay.classList.remove('active'); confirmCallback = null; }
  });

  const PRIORITY_RANK = {high:0, medium:1, low:2};
  function findTaskLocation(p, taskId){
    for(const cat of Object.keys(categoryMeta)){
      const arr = p.tasks[cat] || [];
      const t = arr.find(x=>x.id===taskId);
      if(t) return {category:cat, task:t};
    }
    return null;
  }

  let currentProjectId = null;
  let editingTask = null; // {projectId, category, taskId} or null for new
  let subtaskDraft = [];
  let remarksDraft = []; // [{text, ts}], the task's bulleted remarks log
  let taskIdSeq = 0;
  function newTaskId(){
    taskIdSeq += 1;
    return 't' + Date.now() + '_' + taskIdSeq;
  }
  // Progress rule (same idea as the reference app.js): a task with subtasks
  // always has its progress DERIVED — % of subtasks checked off — and is
  // never manually movable. A task with no subtasks keeps whatever value was
  // set by hand (free 0-100). Re-applied on every render so it's a single
  // source of truth, not something that only gets corrected inside the modal.
  function syncTaskProgress(t){
    const subtasks = t.subtasks || [];
    if(subtasks.length){
      // Progress is always derived from how many subtasks are checked off —
      // e.g. 5 subtasks move in fixed 20% steps, 10 subtasks in 10% steps.
      const pct = Math.round(subtasks.filter(s=>s.completed).length / subtasks.length * 100);
      t.progress = pct;
      // Finishing every subtask auto-completes the task; un-checking one
      // pulls a "completed" task back to "in progress" automatically.
      if(pct === 100 && t.status !== 'completed'){
        t.status = 'completed';
      } else if(pct < 100 && t.status === 'completed'){
        t.status = 'inprogress';
      }
    } else {
      // No subtasks: progress is a fixed function of status only — 0% for
      // To Do / In Progress, 100% for completed. It never moves on its own.
      t.progress = t.status === 'completed' ? 100 : 0;
    }
  }
  function syncAllProgress(p){
    allTasks(p).forEach(syncTaskProgress);
  }
  // Remarks are now a timestamped bullet log rather than one free-text blob.
  // Any task still holding the old plain-string `remarks` gets it migrated
  // into the first entry of `remarksLog` the first time it's touched.
  function ensureRemarksLog(t){
    if(!t.remarksLog){
      t.remarksLog = (t.remarks && t.remarks.trim())
        ? [{text:t.remarks.trim(), ts:new Date().toISOString()}]
        : [];
    }
    return t.remarksLog;
  }
  function fmtTimestamp(iso){
    const d = new Date(iso);
    if(isNaN(d)) return '';
    return d.toLocaleDateString('en-US',{month:'short', day:'numeric', year:'numeric'}) + ' ' +
      d.toLocaleTimeString('en-US',{hour:'numeric', minute:'2-digit'});
  }
  // Used by the modal to preview the computed % as subtasks are checked,
  // before the task object itself is saved.
  function subtaskProgressPct(subtasks){
    if(!subtasks || !subtasks.length) return null;
    return Math.round(subtasks.filter(s=>s.completed).length / subtasks.length * 100);
  }

  const DASH_PAGE_SIZE = 5;
  let overduePage = 1, upcomingPage = 1;
  let overdueSort = {key:'daysOverdue', dir:'desc'};
  let upcomingSort = {key:'deadline', dir:'asc'};
  const today0 = new Date(); today0.setHours(0,0,0,0);
  let calMonth = today0.getMonth(), calYear = today0.getFullYear();
  const GANTT_PAGE_SIZE = 8;
  let ganttMonth = today0.getMonth(), ganttYear = today0.getFullYear(), ganttPage = 1;

  // ---------- RENDER: HOME ----------
  // Home tabs replace the old separate "View Archived" button + status
  // indicator strip: one row of tabs (All / In Progress / Completed /
  // Suspended / Archive), each with its own count, that also acts as the
  // filter for the list below.
  const HOME_TABS = [
    {key:'all', label:'All', dot:null},
    {key:'inprogress', label:'In Progress', dot:'var(--blue)'},
    {key:'completed', label:'Completed', dot:'var(--accent)'},
    {key:'suspended', label:'Suspended', dot:'var(--amber)'},
    {key:'archive', label:'Archive', dot:null}
  ];
  let homeFilter = 'all';
  const viewingArchived = () => homeFilter === 'archive';

  function renderHome(){
    projects.forEach(syncAllProgress);
    const list = document.getElementById('project-card-list');
    const addBtn = document.getElementById('add-project-btn');
    addBtn.style.display = viewingArchived() ? 'none' : 'inline-block';

    const active = projects.filter(p=>!p.archived);
    const archived = projects.filter(p=>p.archived);
    const tabCounts = {
      all: active.length,
      inprogress: active.filter(p=>p.status==='inprogress').length,
      completed: active.filter(p=>p.status==='completed').length,
      suspended: active.filter(p=>p.status==='suspended').length,
      archive: archived.length
    };

    const tabsEl = document.getElementById('home-tabs');
    if(tabsEl){
      tabsEl.innerHTML = HOME_TABS.map(t=>`
        <button class="home-tab ${homeFilter===t.key ? 'active':''}" data-home-tab="${t.key}">
          ${t.dot ? `<span class="home-tab-dot" style="background:${t.dot}"></span>` : ''}${t.label} <span class="home-tab-count">${tabCounts[t.key]}</span>
        </button>
      `).join('');
      tabsEl.querySelectorAll('[data-home-tab]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          homeFilter = btn.dataset.homeTab;
          renderHome();
        });
      });
    }

    const visible = viewingArchived()
      ? archived
      : active.filter(p => homeFilter==='all' || p.status===homeFilter);

    list.innerHTML = visible.length ? visible.map(p => {
      const progress = computeProjectProgress(p);
      // Progress bar is fully automated off the project's own status: a
      // completed project always reads 100% green, a suspended one always
      // reads 100% red (as a full "stopped" bar), anything else shows the
      // real computed progress in the normal accent color.
      let barWidth = progress, barClass = 'bar-inprogress';
      if(p.status==='completed'){ barWidth = 100; barClass='bar-completed'; }
      else if(p.status==='suspended'){ barClass='bar-suspended'; } // stays red, keeps its real progress width — not auto-filled
      return `
      <div class="project-card">
        <div class="project-top">
          <h3 class="project-name">${p.name}</h3>
          <div class="project-actions">
            <button class="chip-btn view" data-open="${p.id}">View</button>
            ${viewingArchived() ? `
            <button class="chip-btn delete" data-delete-project="${p.id}">Delete</button>` : `
            <button class="chip-btn edit" data-edit="${p.id}">Edit</button>
            <button class="chip-btn archive" data-toggle-archive="${p.id}">Archive</button>`}
          </div>
        </div>
        <p class="project-detail"><span class="label">Details:</span>${p.details}</p>
        <p class="project-detail"><span class="label">Lead:</span>${p.lead}</p>
        <div class="progress-track"><div class="progress-fill ${barClass}" style="width:${barWidth}%"></div></div>
        <div class="project-meta">
          <span class="status-pill status-${p.status}">${p.statusLabel}</span>
          <span class="launch-date">Deployment date: <span class="launch-date-value">${p.launch}</span></span>
        </div>
      </div>
    `;}).join('') : `<div class="empty-note">${viewingArchived() ? 'No archived projects.' : 'No projects in this status.'}</div>`;

    list.querySelectorAll('[data-open]').forEach(btn=>{
      btn.addEventListener('click', ()=> openProject(btn.dataset.open));
    });
    list.querySelectorAll('[data-edit]').forEach(btn=>{
      btn.addEventListener('click', ()=> openProjectModal(btn.dataset.edit));
    });
    list.querySelectorAll('[data-toggle-archive]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const proj = projects.find(x=>x.id===btn.dataset.toggleArchive);
        confirmAction(`Archive "${proj.name}"? You can still view it from the archive without restoring it.`, ()=>{
          proj.archived = true;
          renderHome();
        });
      });
    });
    list.querySelectorAll('[data-delete-project]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const proj = projects.find(x=>x.id===btn.dataset.deleteProject);
        confirmAction(`Permanently delete "${proj.name}" and all of its tasks? This cannot be undone.`, ()=>{
          const idx = projects.findIndex(x=>x.id===proj.id);
          if(idx>-1) projects.splice(idx,1);
          renderHome();
        });
      });
    });
  }

  // ---------- RENDER: PROJECT DETAIL ----------
  // Header status color follows the project's own status field — Suspended
  // and Completed are never overridden by task-level detail like overdue
  // tasks, so the badge always matches what's set in Edit Project.
  function projectHeaderStatus(p){
    if(p.status === 'completed') return {label:'Completed', cls:'status-text-completed'};
    if(p.status === 'suspended') return {label:'Suspended', cls:'status-text-suspended'};
    return {label:'In Progress', cls:'status-text-inprogress'};
  }
  function renderDetailHeader(p){
    document.getElementById('detail-title').textContent = p.name;
    document.getElementById('detail-details').textContent = p.details || '';
    document.getElementById('detail-details').style.display = p.details ? 'block' : 'none';
    const hs = projectHeaderStatus(p);
    document.getElementById('detail-sub').innerHTML =
      `Lead: ${p.lead} • <span class="status-text ${hs.cls}">${hs.label}</span>`;
    document.getElementById('detail-rate-value').textContent = `${computeProjectProgress(p)}%`;
    document.getElementById('detail-launch-value').textContent = p.launch || 'TBD';
  }
  function openProject(id){
    currentProjectId = id;
    const p = projects.find(x=>x.id===id);
    renderDetailHeader(p);
    document.getElementById('archived-banner').style.display = p.archived ? 'flex' : 'none';
    document.getElementById('add-task-btn').style.display = p.archived ? 'none' : 'inline-block';
    switchScreen('screen-detail');
    switchTab('task');
    overduePage = 1; upcomingPage = 1;
    overdueSort = {key:'daysOverdue', dir:'desc'};
    upcomingSort = {key:'deadline', dir:'asc'};
    const today = new Date();
    calMonth = today.getMonth(); calYear = today.getFullYear();
    ganttMonth = today.getMonth(); ganttYear = today.getFullYear(); ganttPage = 1;
    renderTaskGroups();
    renderDashboard();
    renderCalendar();
  }

  // Was missing testing/deployment/maintenance keys, which made their filter
  // silently compare status to `undefined` and hide every task in those tabs.
  let categoryFilters = Object.keys(categoryMeta).reduce((acc,c)=>{ acc[c]='all'; return acc; }, {});

  function fmtDate(iso){
    if(!iso) return '—';
    const d = new Date(iso+'T00:00:00');
    if(isNaN(d)) return iso;
    return d.toLocaleDateString('en-US',{month:'short', day:'numeric', year:'numeric'});
  }

  function renderTaskGroups(){
    const p = projects.find(x=>x.id===currentProjectId);
    syncAllProgress(p);
    renderDetailHeader(p);
    const readOnly = !!p.archived;
    const container = document.getElementById('task-groups');
    container.innerHTML = Object.keys(categoryMeta).map((cat, i)=>{
      const meta = categoryMeta[cat];
      const allItems = p.tasks[cat] || [];
      const filter = categoryFilters[cat];
      const filtered = filter==='all' ? allItems : allItems.filter(t=> (t.status||'todo')===filter);
      // Default order: High -> Medium -> Low priority.
      const items = filtered.slice().sort((a,b)=> (PRIORITY_RANK[a.priority]??3) - (PRIORITY_RANK[b.priority]??3));

      const rows = items.length ? items.map(t=>{
        const status = t.status || 'todo';
        const progress = t.progress || 0;
        const remarksLog = ensureRemarksLog(t);
        const remarksHtml = remarksLog.length
          ? `<ul class="remarks-cell-list">${remarksLog.slice(-3).map(r=>`<li title="${fmtTimestamp(r.ts).replace(/"/g,'&quot;')}">${(r.text||'').replace(/</g,'&lt;')}</li>`).join('')}</ul>`
          : '—';
        return `
        <tr data-task="${t.id}" data-cat="${cat}">
          <td>
            <div class="task-name-cell">
              <span class="task-priority prio-${t.priority}"></span>
              <span>${t.name}</span>
            </div>
          </td>
          <td class="assignee-cell" title="${(t.assignee||'Unassigned').replace(/"/g,'&quot;')}">${t.assignee ? toInitials(t.assignee) : 'Unassigned'}</td>
          <td class="priority-${t.priority}" style="text-transform:capitalize;font-weight:700;">${t.priority}</td>
          <td class="deadline-cell">${fmtDate(t.deadline)}</td>
          <td><span class="status-badge status-${status}">${STATUS_LABELS[status] || status}</span></td>
          <td class="remarks-cell">${remarksHtml}</td>
          <td>
            <div class="progress-cell">
              <div class="progress-mini-track"><div class="progress-mini-fill" style="width:${progress}%"></div></div>
              <span class="progress-mini-text">${progress}%</span>
            </div>
          </td>
          <td class="row-actions">
            ${readOnly ? '' : `<button class="delete-row-btn" data-delete-task="${t.id}" data-cat="${cat}" title="Delete task">${TRASH_ICON}</button>`}
          </td>
        </tr>`;
      }).join('') : `<tr><td colspan="8"><div class="empty-note">No tasks${filter!=='all' ? ' with this status':''}</div></td></tr>`;

      return `
        <div class="task-group" data-cat="${cat}">
          <div class="task-group-head">
            <div class="task-group-title"><span class="cat-emoji">${meta.emoji}</span><span class="dot ${meta.dot}" style="background:${meta.color}"></span>${meta.label} <span class="count-badge">${allItems.length}</span></div>
            <div class="task-group-controls">
              <select class="filter-select" data-filter-cat="${cat}" onclick="event.stopPropagation()">
                <option value="all" ${filter==='all'?'selected':''}>All statuses</option>
                <option value="inprogress" ${filter==='inprogress'?'selected':''}>In Progress</option>
                <option value="completed" ${filter==='completed'?'selected':''}>Completed</option>
              </select>
              <div class="chevron">▾</div>
            </div>
          </div>
          <div class="task-group-body">
            <div class="task-table-wrap">
              <table class="task-table">
                <thead>
                  <tr>
                    <th>Task</th><th>Assigned To</th><th>Priority</th><th>Deadline</th>
                    <th>Status</th><th>Remarks</th><th>Progress</th><th></th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // collapsible behavior
    container.querySelectorAll('.task-group-head').forEach(head=>{
      head.addEventListener('click', ()=>{
        const group = head.parentElement;
        group.classList.toggle('open');
        const body = group.querySelector('.task-group-body');
        body.style.maxHeight = group.classList.contains('open') ? body.scrollHeight+'px' : 0;
      });
    });
    container.querySelectorAll('.task-group.open .task-group-body').forEach(b=>{
      b.style.maxHeight = b.scrollHeight+'px';
    });

    // filter dropdowns
    container.querySelectorAll('.filter-select').forEach(sel=>{
      sel.addEventListener('change', ()=>{
        categoryFilters[sel.dataset.filterCat] = sel.value;
        renderTaskGroups();
      });
    });

    // open modal on row click
    container.querySelectorAll('.task-table tbody tr[data-task]').forEach(row=>{
      row.addEventListener('click', ()=>{
        openTaskModal({projectId:currentProjectId, category:row.dataset.cat, taskId:row.dataset.task});
      });
    });

    // delete button (with confirmation), replacing the old ⋮ row menu
    container.querySelectorAll('.delete-row-btn').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        const taskId = btn.dataset.deleteTask, cat = btn.dataset.cat;
        const proj = projects.find(x=>x.id===currentProjectId);
        const task = (proj.tasks[cat]||[]).find(t=>t.id===taskId);
        confirmAction(`Delete task "${task ? task.name : ''}"? This cannot be undone.`, ()=>{
          const arr = proj.tasks[cat];
          const idx = arr.findIndex(t=>t.id===taskId);
          if(idx>-1) arr.splice(idx,1);
          renderTaskGroups();
          renderDashboard();
          renderCalendar();
        });
      });
    });
  }

  // ---------- RENDER: DASHBOARD ----------
  function renderDashboard(){
    const p = projects.find(x=>x.id===currentProjectId);
    syncAllProgress(p);
    const d = p.dashboard;
    if(!d){ document.getElementById('dashboard-content').innerHTML = `<div class="placeholder">No dashboard data yet.</div>`; return; }

    const tasks = allTasks(p);

    // pie cards — one donut per SDLC category, each partitioned into
    // In Progress / Completed / Overdue slices for that category's
    // tasks. Hover the ring for the exact breakdown instead of a bare number.
    const pieCards = Object.keys(categoryMeta).map(catKey=>{
      const meta = categoryMeta[catKey];
      const catTasks = p.tasks[catKey] || [];
      const counts = {inprogress:0, completed:0, overdue:0};
      catTasks.forEach(t=> counts[taskBucket(t)]++ );
      const total = catTasks.length;
      let acc = 0;
      const stops = [];
      [['inprogress',counts.inprogress,'var(--blue)'],
       ['completed',counts.completed,'var(--accent)'], ['overdue',counts.overdue,'#9e2c15']].forEach(([key,n,color])=>{
        if(!total || !n) return;
        const pct = (n/total)*100;
        stops.push(`${color} ${acc}% ${acc+pct}%`);
        acc += pct;
      });
      const gradient = stops.length ? `conic-gradient(${stops.join(', ')})` : '#e5e7eb';
      const tooltipRows = [
        ['inprogress','swatch-inprogress','In Progress',counts.inprogress],
        ['completed','swatch-completed','Completed',counts.completed],
        ['overdue','swatch-overdue','Overdue',counts.overdue]
      ].filter(([,,,n])=> n > 0)
       .map(([key,swatch,label,n])=>
        `<div class="pie-tooltip-row"><span class="legend-swatch ${swatch}"></span>${label}<span class="pie-tooltip-val">${n}</span></div>`
       ).join('') || `<div class="pie-tooltip-row">No tasks yet</div>`;
      return `
        <div class="pie-card">
          <span class="pie-label">${meta.emoji} ${meta.label}</span>
          <div class="pie-card-ring-wrap">
            <div class="pie-ring pie-ring-hover" style="background:${gradient}">
              <span class="pie-count">${total}</span>
              <div class="pie-tooltip">${tooltipRows}</div>
            </div>
          </div>
          </div>`;
    }).join('');

    const legendRow = `
      <div class="dash-block">
        <p class="dash-block-title">Task Status Breakdown — by Category</p>
        <div class="gantt-legend" style="margin-bottom:12px;">
          <span><span class="legend-swatch swatch-inprogress"></span>In Progress</span>
          <span><span class="legend-swatch swatch-completed"></span>Completed</span>
          <span><span class="legend-swatch swatch-overdue"></span>Overdue</span>

        </div>
        <div class="pie-row">
          ${pieCards}
        </div>
      </div>`;

    // gantt chart — one calendar month at a time, built from each task's
    // real start/deadline dates (falls back to a single-day bar on the
    // deadline if no start date was set), paginated when a lot of tasks
    // fall in the visible month.
    const daysInGanttMonth = new Date(ganttYear, ganttMonth+1, 0).getDate();
    const monthStart = new Date(ganttYear, ganttMonth, 1);
    const monthEnd = new Date(ganttYear, ganttMonth, daysInGanttMonth);
    const ganttEntries = tasks.filter(t=>t.deadline).map(t=>{
      const dlDate = new Date(t.deadline+'T00:00:00');
      const stDate = t.start ? new Date(t.start+'T00:00:00') : dlDate;
      return {t, stDate: stDate <= dlDate ? stDate : dlDate, dlDate};
    }).filter(({stDate,dlDate})=> dlDate >= monthStart && stDate <= monthEnd)
      .sort((a,b)=> a.stDate - b.stDate);

    const ganttTotalPages = Math.max(1, Math.ceil(ganttEntries.length / GANTT_PAGE_SIZE));
    const ganttSafePage = Math.min(ganttPage, ganttTotalPages);
    const ganttPageItems = ganttEntries.slice((ganttSafePage-1)*GANTT_PAGE_SIZE, ganttSafePage*GANTT_PAGE_SIZE);

    // Fixed 31-column grid regardless of the month's actual length, so the
    // chart layout never shifts between months. Days past the month's real
    // length are rendered as disabled/greyed columns. Each task renders as
    // ONE continuous solid bar (a single grid item spanning multiple day
    // columns) instead of a colored cell per day, so there are no seams.
    const GANTT_COLS = 31;
    const ganttTrackTemplate = `repeat(${GANTT_COLS}, minmax(0, 1fr))`;
    const ganttHead = Array.from({length:GANTT_COLS}, (_,i)=>{
      const day = i+1;
      const disabled = day > daysInGanttMonth;
      return `<div class="gantt-grid-head-cell${disabled?' disabled':''}">${disabled ? '' : day}</div>`;
    }).join('');

    const ganttRows = ganttPageItems.length ? ganttPageItems.map(({t,stDate,dlDate})=>{
      const startDay = stDate < monthStart ? 1 : stDate.getDate();
      const endDay = dlDate > monthEnd ? daysInGanttMonth : dlDate.getDate();
      const cls = isOverdue(t) ? 'swatch-overdue' : (t.status==='completed' ? 'swatch-completed' : 'swatch-inprogress');
      return `
        <div class="gantt-grid-row">
          <div class="gantt-grid-taskname" title="${t.name.replace(/"/g,'&quot;')}">${t.name}</div>
          <div class="gantt-grid-track" style="grid-template-columns:${ganttTrackTemplate};">
            <div class="gantt-grid-invalid" style="grid-column:${daysInGanttMonth+1} / ${GANTT_COLS+1};"></div>
            <div class="gantt-grid-bar ${cls}" style="grid-column:${startDay} / ${endDay+1};" title="${t.name.replace(/"/g,'&quot;')} — ${fmtDate(t.deadline)}"></div>
          </div>
        </div>`;
    }).join('') : `<div class="empty-note">No tasks with deadlines in ${MONTH_NAMES[ganttMonth]} ${ganttYear}.</div>`;

    const ganttBlock = `
      <div class="dash-block">
        <div class="gantt-head-row">
          <p class="dash-block-title" style="margin:0;">Gantt Chart</p>
          <div class="cal-nav gantt-nav">
            <button class="cal-nav-btn" data-gantt-nav="-1">‹</button>
            <span class="cal-month-label gantt-month-label">${MONTH_NAMES[ganttMonth]} ${ganttYear}</span>
            <button class="cal-nav-btn" data-gantt-nav="1">›</button>
          </div>
        </div>
        <div class="gantt-legend">
          <span><span class="legend-swatch swatch-inprogress"></span>In Progress</span>
          <span><span class="legend-swatch swatch-completed"></span>Completed</span>
          <span><span class="legend-swatch swatch-overdue"></span>Overdue</span>

        </div>
        <div class="gantt-wrap">
          <div class="gantt-grid-head-row">
            <div class="gantt-grid-taskname" style="font-size:11px;color:var(--muted);font-weight:700;">Task name</div>
            <div class="gantt-grid-track-head" style="grid-template-columns:${ganttTrackTemplate};">${ganttHead}</div>
          </div>
          <div class="gantt-grid-rows">${ganttRows}</div>
        </div>
        <div class="pager">
          <span class="pager-info">Page ${ganttSafePage} of ${ganttTotalPages}</span>
          <button class="pager-btn" data-gantt-page-dir="-1" ${ganttSafePage<=1?'disabled':''}>‹</button>
          <button class="pager-btn" data-gantt-page-dir="1" ${ganttSafePage>=ganttTotalPages?'disabled':''}>›</button>
        </div>
      </div>`;

    // workload by employee — partitioned into In Progress / Overdue / Completed.
    // Names are normalized (trimmed, single-spaced, first letter of each word
    // capitalized) before grouping, so "john", "John", and "john  smith" all
    // fold into one consistent row instead of duplicating the same person.
    const normalizeAssignee = raw=>{
      const trimmed = (raw || '').trim().replace(/\s+/g,' ');
      return trimmed ? capitalizeWords(trimmed.toLowerCase()) : 'Unassigned';
    };
    const empMap = {};
    tasks.forEach(t=>{
      const name = normalizeAssignee(t.assignee);
      if(!empMap[name]) empMap[name] = {inprogress:0, overdue:0, completed:0, total:0};
      empMap[name][taskBucket(t)]++;
      empMap[name].total++;
    });
    const employees = Object.keys(empMap).map(name=>({name, ...empMap[name]}));
    const maxTasks = Math.max(...employees.map(e=>e.total), 1);
    const employeeRows = employees.map(e=>`
      <div class="employee-row">
        <span class="employee-name">${e.name}</span>
        <div class="employee-track">
          <div class="employee-seg swatch-inprogress" style="width:${(e.inprogress/maxTasks)*100}%" title="In Progress: ${e.inprogress}"></div>
          <div class="employee-seg swatch-completed" style="width:${(e.completed/maxTasks)*100}%" title="Completed: ${e.completed}"></div>
          <div class="employee-seg swatch-overdue" style="width:${(e.overdue/maxTasks)*100}%" title="Overdue: ${e.overdue}"></div>
        </div>
      </div>`).join('');

    // x-axis ticks (count of tasks) shared across all employee bars, so the
    // whole block reads as one x/y bar chart rather than separate progress
    // bars: y-axis = employee names, x-axis = task count.
    let tickValues;
    if(maxTasks <= 8){
      tickValues = Array.from({length:maxTasks}, (_,i)=>i+1);
    } else {
      const step = Math.ceil(maxTasks/6);
      tickValues = [];
      for(let v=step; v<maxTasks; v+=step) tickValues.push(v);
      tickValues.push(maxTasks);
    }
    const gridLines = tickValues.map(v=>`<div class="employee-gridline" style="left:${(v/maxTasks)*100}%"></div>`).join('');
    const axisTicks = tickValues.map(v=>`<span class="employee-axis-tick" style="left:${(v/maxTasks)*100}%">${v}</span>`).join('');

    const employeeBlock = `
      <div class="dash-block">
        <p class="dash-block-title">Workload — by Employee</p>
        <div class="gantt-legend" style="margin-bottom:12px;">
          <span><span class="legend-swatch swatch-inprogress"></span>In Progress</span>
          <span><span class="legend-swatch swatch-completed"></span>Completed</span>
          <span><span class="legend-swatch swatch-overdue"></span>Overdue</span>
        </div>
        <div class="employee-chart">
          <div class="employee-rows-wrap">
            <div class="employee-gridlines">${gridLines}</div>
            <div class="employee-rows">${employeeRows}</div>
          </div>
          <div class="employee-axis-row">
            <div class="employee-axis-spacer"></div>
            <div class="employee-axis-track">
              <div class="employee-axis-line"></div>
              ${axisTicks}
            </div>
            <div class="employee-axis-endspacer"></div>
          </div>
          <div class="employee-axis-caption">Number of tasks</div>
        </div>
      </div>`;

    // overdue table (dynamic, sortable, paginated)
    const overdueData = tasks.filter(isOverdue).map(t=>{
      const dl = new Date(t.deadline+'T00:00:00');
      const daysOverdue = Math.max(1, Math.round((today0 - dl) / 86400000));
      return {task:t.name, deadline:t.deadline, deadlineLabel:fmtDate(t.deadline), assignee:t.assignee||'Unassigned', daysOverdue};
    });
    const overdueBlock = renderSortedTable({
      title:'Overdue',
      data: overdueData,
      sortState: overdueSort,
      page: overduePage,
      cols: [
        {key:'task', label:'Task'},
        {key:'deadline', label:'Deadline'},
        {key:'assignee', label:'Assigned to'},
        {key:'daysOverdue', label:'Days'}
      ],
      renderRow: o=>`<tr><td>${o.task}</td><td>${o.deadlineLabel}</td><td>${o.assignee}</td><td class="overdue-days">${o.daysOverdue} days overdue</td></tr>`,
      emptyMsg:'Nothing overdue — nice.',
      id:'overdue'
    });

    // upcoming deadlines table — tasks due within the next 1-2 weeks (dynamic, sortable, paginated)
    const upcomingData = tasks.filter(t=>{
      if(t.status==='completed' || isOverdue(t) || !t.deadline) return false;
      const dl = new Date(t.deadline+'T00:00:00');
      const daysOut = Math.round((dl - today0) / 86400000);
      return daysOut >= 0 && daysOut <= 14;
    }).map(t=>({
      task:t.name, deadline:t.deadline||'', deadlineLabel:fmtDate(t.deadline), employee:t.assignee||'Unassigned', progress:t.progress||0
    }));
    const upcomingBlock = renderSortedTable({
      title:'Upcoming Deadlines (next 1–2 weeks)',
      data: upcomingData,
      sortState: upcomingSort,
      page: upcomingPage,
      cols: [
        {key:'task', label:'Task'},
        {key:'deadline', label:'Deadline'},
        {key:'employee', label:'Employee'},
        {key:'progress', label:'Progress'}
      ],
      renderRow: u=>`<tr><td>${u.task}</td><td>${u.deadlineLabel}</td><td>${u.employee}</td><td><span class="progress-mini">${u.progress}%</span></td></tr>`,
      emptyMsg:'No upcoming deadlines.',
      id:'upcoming'
    });

    document.getElementById('dashboard-content').innerHTML =
      legendRow + ganttBlock + employeeBlock +
      `<div class="dash-two-col">${overdueBlock}${upcomingBlock}</div>`;

    wireSortedTable('overdue', overdueData.length, sortState=>{ overdueSort = sortState; }, page=>{ overduePage = page; }, overdueSort, overduePage);
    wireSortedTable('upcoming', upcomingData.length, sortState=>{ upcomingSort = sortState; }, page=>{ upcomingPage = page; }, upcomingSort, upcomingPage);

    document.querySelectorAll('[data-gantt-nav]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        ganttMonth += parseInt(btn.dataset.ganttNav,10);
        if(ganttMonth<0){ ganttMonth=11; ganttYear--; }
        if(ganttMonth>11){ ganttMonth=0; ganttYear++; }
        ganttPage = 1;
        renderDashboard();
      });
    });
    document.querySelectorAll('[data-gantt-page-dir]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        ganttPage += parseInt(btn.dataset.ganttPageDir,10);
        renderDashboard();
      });
    });
  }

  // Generic sortable + paginated dashboard table renderer
  function renderSortedTable({title, data, sortState, page, cols, renderRow, emptyMsg, id}){
    const sorted = data.slice().sort((a,b)=>{
      let av = a[sortState.key], bv = b[sortState.key];
      if(typeof av === 'string') av = av.toLowerCase();
      if(typeof bv === 'string') bv = bv.toLowerCase();
      if(av < bv) return sortState.dir==='asc' ? -1 : 1;
      if(av > bv) return sortState.dir==='asc' ? 1 : -1;
      return 0;
    });
    const totalPages = Math.max(1, Math.ceil(sorted.length / DASH_PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pageItems = sorted.slice((safePage-1)*DASH_PAGE_SIZE, safePage*DASH_PAGE_SIZE);
    const rows = pageItems.length ? pageItems.map(renderRow).join('') : `<tr><td colspan="${cols.length}" style="color:var(--muted);">${emptyMsg}</td></tr>`;
    const headCells = cols.map(c=>{
      const active = sortState.key===c.key;
      const arrow = active ? (sortState.dir==='asc'?'▲':'▼') : '';
      return `<th data-sort-key="${c.key}" data-table="${id}">${c.label}${active?`<span class="sort-arrow">${arrow}</span>`:''}</th>`;
    }).join('');

    return `
      <div class="dash-block">
        <p class="dash-block-title">${title}</p>
        <table class="dash-table" data-table-id="${id}">
          <thead><tr>${headCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="pager">
          <span class="pager-info">Page ${safePage} of ${totalPages}</span>
          <button class="pager-btn" data-page-dir="-1" data-table="${id}" ${safePage<=1?'disabled':''}>‹</button>
          <button class="pager-btn" data-page-dir="1" data-table="${id}" ${safePage>=totalPages?'disabled':''}>›</button>
        </div>
      </div>`;
  }

  function wireSortedTable(id, dataLen, onSort, onPage, sortState, page){
    document.querySelectorAll(`th[data-table="${id}"]`).forEach(th=>{
      th.addEventListener('click', ()=>{
        const key = th.dataset.sortKey;
        const newDir = (sortState.key===key && sortState.dir==='asc') ? 'desc' : 'asc';
        onSort({key, dir:newDir});
        renderDashboard();
      });
    });
    document.querySelectorAll(`button[data-table="${id}"][data-page-dir]`).forEach(btn=>{
      btn.addEventListener('click', ()=>{
        onPage(page + parseInt(btn.dataset.pageDir,10));
        renderDashboard();
      });
    });
  }

  // ---------- RENDER: CALENDAR ----------
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DOW_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function renderCalendar(){
    if(!currentProjectId) return;
    const p = projects.find(x=>x.id===currentProjectId);
    const tasks = allTasks(p).filter(t=>t.deadline);

    // map deadline -> tasks due that day
    const byDate = {};
    tasks.forEach(t=>{
      byDate[t.deadline] = byDate[t.deadline] || [];
      byDate[t.deadline].push(t);
    });

    document.getElementById('cal-month-label').textContent = `${MONTH_NAMES[calMonth]} ${calYear}`;

    const firstDow = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
    const todayStr = `${today0.getFullYear()}-${String(today0.getMonth()+1).padStart(2,'0')}-${String(today0.getDate()).padStart(2,'0')}`;

    let cells = DOW_NAMES.map(d=>`<div class="cal-dow">${d}</div>`).join('');
    for(let i=0;i<firstDow;i++){ cells += `<div class="cal-cell empty"></div>`; }
    for(let day=1; day<=daysInMonth; day++){
      const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const dayTasks = byDate[dateStr] || [];
      const isToday = dateStr===todayStr;
      const chips = dayTasks.slice(0,2).map(t=>{
        const overdue = isOverdue(t);
        const statusClass = t.status==='completed' ? 'chip-completed' : (t.status==='inprogress' ? 'chip-inprogress' : 'chip-todo');
        return `<span class="cal-task-chip ${statusClass} ${overdue?'overdue-chip':''}" title="${t.name.replace(/"/g,'&quot;')}" data-open-day="${dateStr}">${t.name}</span>`;
      }).join('');
      const more = dayTasks.length>2 ? `<span class="cal-more" data-open-day="${dateStr}">+${dayTasks.length-2} more</span>` : '';
      cells += `<div class="cal-cell ${isToday?'today':''}"><span class="cal-daynum">${day}</span>${chips}${more}</div>`;
    }

    document.getElementById('cal-grid').innerHTML = cells;

    document.querySelectorAll('#cal-grid [data-open-day]').forEach(el=>{
      el.addEventListener('click', ()=> openDayModal(el.dataset.openDay, byDate[el.dataset.openDay] || []));
    });
  }

  // ---------- CALENDAR DAY-DETAIL MODAL ----------
  const dayOverlay = document.getElementById('day-modal-overlay');
  function openDayModal(dateStr, dayTasks){
    const p = projects.find(x=>x.id===currentProjectId);
    const d = new Date(dateStr+'T00:00:00');
    document.getElementById('day-modal-title').textContent = isNaN(d) ? 'Tasks' : d.toLocaleDateString('en-US',{month:'long', day:'numeric', year:'numeric'});
    document.getElementById('day-modal-body').innerHTML = dayTasks.length ? dayTasks.map(t=>{
      const overdue = isOverdue(t);
      const statusClass = t.status==='completed' ? 'chip-completed' : (t.status==='inprogress' ? 'chip-inprogress' : 'chip-todo');
      const cat = categoryMeta[t.category];
      return `
      <div class="day-modal-row" data-open-task="${t.id}">
        <span class="cal-task-chip ${statusClass} ${overdue?'overdue-chip':''}" style="white-space:normal;">${t.name}</span>
        <span class="day-modal-row-meta">${cat ? `<span class="day-modal-row-cat" title="${cat.label}">${cat.emoji} ${cat.label}</span> · ` : ''}${t.assignee || 'Unassigned'} · ${STATUS_LABELS[t.status]||t.status}</span>
      </div>`;
    }).join('') : `<div class="empty-note">No tasks.</div>`;
    document.querySelectorAll('#day-modal-body [data-open-task]').forEach(el=>{
      el.addEventListener('click', ()=>{
        const loc = findTaskLocation(p, el.dataset.openTask);
        closeDayModal();
        if(loc) openTaskModal({projectId:currentProjectId, category:loc.category, taskId:loc.task.id});
      });
    });
    dayOverlay.classList.add('active');
  }
  function closeDayModal(){ dayOverlay.classList.remove('active'); }
  document.getElementById('day-modal-close-btn').addEventListener('click', closeDayModal);
  dayOverlay.addEventListener('click', (e)=>{ if(e.target===dayOverlay) closeDayModal(); });

  document.getElementById('cal-prev').addEventListener('click', ()=>{
    calMonth--; if(calMonth<0){ calMonth=11; calYear--; }
    renderCalendar();
  });
  document.getElementById('cal-next').addEventListener('click', ()=>{
    calMonth++; if(calMonth>11){ calMonth=0; calYear++; }
    renderCalendar();
  });

  // ---------- SCREEN / TAB SWITCHING ----------
  function switchScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  function switchTab(tabName){
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===tabName));
    document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active', p.id==='panel-'+tabName));
    if(tabName==='calendar') renderCalendar();
  }
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=> switchTab(tab.dataset.tab));
  });
  document.getElementById('back-to-home').addEventListener('click', ()=>{
    switchScreen('screen-home');
    renderHome();
  });
  document.getElementById('restore-from-detail-btn').addEventListener('click', ()=>{
    const p = projects.find(x=>x.id===currentProjectId);
    if(!p) return;
    confirmAction(`Restore "${p.name}" from the archive?`, ()=>{
      p.archived = false;
      document.getElementById('archived-banner').style.display = 'none';
      document.getElementById('add-task-btn').style.display = 'inline-block';
    });
  });

  // ---------- TASK MODAL ----------
  const overlay = document.getElementById('task-modal-overlay');

  function openTaskModal(target){
    editingTask = target || null;
    subtaskDraft = [];
    remarksDraft = [];

    const isEdit = !!(target && target.taskId);
    const proj = target && target.projectId ? projects.find(x=>x.id===target.projectId) : null;
    const readOnly = !!(proj && proj.archived);
    document.getElementById('modal-title').textContent = readOnly ? 'View Task (archived — read-only)' : (isEdit ? 'Edit Task' : 'New Task');
    document.getElementById('task-modal-overlay').querySelectorAll('input,select,textarea,button.add-line-btn').forEach(el=>{
      if(el.id !== 'modal-cancel-btn') el.disabled = readOnly;
    });
    document.getElementById('modal-submit-btn').style.display = readOnly ? 'none' : 'inline-block';

    if (isEdit){
      const p = projects.find(x=>x.id===target.projectId);
      const t = p.tasks[target.category].find(x=>x.id===target.taskId);
      document.getElementById('f-name').value = t.name;
      document.getElementById('f-priority').value = t.priority;
      document.getElementById('f-category').value = target.category;
      document.getElementById('f-assignee').value = t.assignee || '';
      document.getElementById('f-start').value = t.start || '';
      document.getElementById('f-deadline').value = t.deadline || '';
      document.getElementById('f-repeat').value = t.repeat || 'none';
      // The modal only offers In Progress / Completed now — a legacy "To Do"
      // task opens as In Progress here; saving will carry that forward.
      document.getElementById('f-status').value = t.status === 'completed' ? 'completed' : 'inprogress';
      document.getElementById('f-progress').value = t.progress || 0;
      document.getElementById('f-progress-val').textContent = t.progress || 0;
      subtaskDraft = (t.subtasks || []).slice();
      remarksDraft = ensureRemarksLog(t).slice();
    } else {
      document.getElementById('f-name').value = '';
      document.getElementById('f-priority').value = 'medium';
      document.getElementById('f-category').value = (target && target.category) || 'planning';
      document.getElementById('f-assignee').value = '';
      document.getElementById('f-start').value = '';
      document.getElementById('f-deadline').value = '';
      document.getElementById('f-repeat').value = 'none';
      document.getElementById('f-status').value = 'inprogress';
      document.getElementById('f-progress').value = 0;
      document.getElementById('f-progress-val').textContent = 0;
      remarksDraft = [];
    }
    updateStatusFieldColor();
    renderSubtasks();
    renderRemarksLog(readOnly);
    overlay.classList.add('active');
  }

  // Colors the Status field itself — blue while In Progress, green once
  // Completed — so the two allowed states are readable at a glance.
  function updateStatusFieldColor(){
    const el = document.getElementById('f-status');
    el.classList.toggle('status-select-inprogress', el.value === 'inprogress');
    el.classList.toggle('status-select-completed', el.value === 'completed');
  }

  // Live title-case: capitalizes the first letter after the start of the
  // field and after every space as the person types, without touching the
  // rest of what they've typed (so "iPhone" or "McKay" stay intact). Used
  // on the task name (so it's uppercased for every first and space) and on
  // the assignee field (so "john"/"John" collapse into one workload entry
  // instead of showing up as two separate people).
  function capitalizeWords(str){
    return str.replace(/(^|\s)([a-z])/g, (m, boundary, letter) => boundary + letter.toUpperCase());
  }
  // Names only: letters (incl. accented), digits, spaces, hyphens and
  // apostrophes — so things like "Team 2" or "Anna-Marie" are allowed.
  // Strips other symbols outright, and strips any leading space/hyphen/
  // apostrophe so a name can never start with a non-letter/digit character.
  function sanitizeName(str){
    return str
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9 '-]/g, '')
      .replace(/^[\s'-]+/, '');
  }
  function wireLiveTitleCase(id, { nameOnly } = {}){
    const el = document.getElementById(id);
    el.addEventListener('input', ()=>{
      const pos = el.selectionStart;
      const lenBefore = el.value.length;
      let next = nameOnly ? sanitizeName(el.value) : el.value;
      next = capitalizeWords(next);
      if(next !== el.value){
        const removed = lenBefore - next.length;
        el.value = next;
        const newPos = Math.max(0, pos - removed);
        el.selectionStart = el.selectionEnd = newPos;
      }
    });
  }
  wireLiveTitleCase('f-name');
  wireLiveTitleCase('f-assignee', { nameOnly: true });

  document.getElementById('f-progress').addEventListener('input', (e)=>{
    document.getElementById('f-progress-val').textContent = e.target.value;
    document.getElementById('f-progress-bar-fill').style.width = e.target.value + '%';
  });

  function closeTaskModal(){
    overlay.classList.remove('active');
    editingTask = null;
  }

  document.getElementById('add-task-btn').addEventListener('click', ()=>{
    openTaskModal({projectId: currentProjectId, category:'planning'});
  });
  document.getElementById('modal-cancel-btn').addEventListener('click', closeTaskModal);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeTaskModal(); });

  // subtasks
  function syncProgressFromSubtasks(){
    const field = document.getElementById('f-progress');
    const label = document.getElementById('f-progress-val');
    const note = document.getElementById('f-progress-note');
    const fill = document.getElementById('f-progress-bar-fill');
    const statusField = document.getElementById('f-status');
    const computed = subtaskProgressPct(subtaskDraft);
    let value;
    if(computed !== null){
      // Has subtasks: progress moves in fixed steps (100 / count) as each
      // one is checked off. Reaching 100% flips status to completed on its own;
      // unchecking one after that pulls it back to In Progress.
      value = computed;
      note.textContent = '(auto from subtasks)';
      if(computed === 100){
        statusField.value = 'completed';
      } else if(statusField.value === 'completed'){
        statusField.value = 'inprogress';
      }
    } else {
      // No subtasks: progress is fixed to the status — 0% for To Do / In
      // Progress, 100% for completed. It never moves on its own otherwise.
      value = statusField.value === 'completed' ? 100 : 0;
      note.textContent = '(auto from status)';
    }
    field.value = value;
    label.textContent = value;
    field.disabled = true;
    fill.style.width = value + '%';
    updateStatusFieldColor();
  }

  function renderSubtasks(){
    const list = document.getElementById('subtask-list');
    const empty = document.getElementById('subtask-empty');
    empty.style.display = subtaskDraft.length ? 'none' : 'block';
    list.innerHTML = subtaskDraft.map((s, idx)=>`
      <div class="subtask-row">
        <input type="checkbox" ${s.completed?'checked':''} data-idx="${idx}" class="sub-check">
        <input type="text" value="${s.name}" data-idx="${idx}" class="sub-name">
        <span class="remove-x" data-idx="${idx}">✕</span>
      </div>
    `).join('');

    list.querySelectorAll('.sub-check').forEach(cb=>{
      cb.addEventListener('change', ()=>{
        subtaskDraft[cb.dataset.idx].completed = cb.checked;
        syncProgressFromSubtasks();
      });
    });
    list.querySelectorAll('.sub-name').forEach(inp=>{
      inp.addEventListener('input', ()=>{ subtaskDraft[inp.dataset.idx].name = inp.value; });
    });
    list.querySelectorAll('.remove-x').forEach(x=>{
      x.addEventListener('click', ()=>{
        const idx = x.dataset.idx;
        const sub = subtaskDraft[idx];
        confirmAction(`Delete subtask "${sub && sub.name ? sub.name : 'this subtask'}"?`, ()=>{
          subtaskDraft.splice(idx,1);
          renderSubtasks();
        });
      });
    });
    syncProgressFromSubtasks();
  }
  function renderRemarksLog(readOnly){
    const list = document.getElementById('remarks-log');
    const empty = document.getElementById('remarks-empty');
    empty.style.display = remarksDraft.length ? 'none' : 'block';
    list.innerHTML = remarksDraft.map((r,idx)=>`
      <li class="remarks-log-item">
        <span class="remarks-log-text">${(r.text||'').replace(/</g,'&lt;')}</span>
        <span class="remarks-log-ts">${fmtTimestamp(r.ts)}</span>
        ${readOnly ? '' : `<button type="button" class="remarks-log-delete" data-remark-idx="${idx}" title="Delete remark">✕</button>`}
      </li>
    `).join('');
    const addRow = document.getElementById('f-remarks-new').closest('.remarks-add-row');
    if(addRow) addRow.style.display = readOnly ? 'none' : 'flex';
    list.querySelectorAll('.remarks-log-delete').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = parseInt(btn.dataset.remarkIdx, 10);
        confirmAction('Delete this remark? This cannot be undone.', ()=>{
          remarksDraft.splice(idx, 1);
          renderRemarksLog(readOnly);
        });
      });
    });
  }
  document.getElementById('add-remark-btn').addEventListener('click', ()=>{
    const input = document.getElementById('f-remarks-new');
    const text = input.value.trim();
    if(!text) return;
    remarksDraft.push({text, ts:new Date().toISOString()});
    input.value = '';
    renderRemarksLog(false);
  });

  document.getElementById('add-subtask-btn').addEventListener('click', ()=>{
    subtaskDraft.push({name:'', completed:false});
    renderSubtasks();
  });

  document.getElementById('f-status').addEventListener('change', (e)=>{
    if(subtaskDraft.length){
      if(e.target.value === 'completed'){
        // Marking completed manually checks off every subtask so the two stay consistent.
        subtaskDraft.forEach(s=> s.completed = true);
        renderSubtasks();
      } else {
        syncProgressFromSubtasks();
      }
    } else {
      // No subtasks: To Do / In Progress = 0%, completed = 100%.
      syncProgressFromSubtasks();
    }
  });

  // submit / delete
  document.getElementById('modal-submit-btn').addEventListener('click', ()=>{
    const name = document.getElementById('f-name').value.trim();
    if(!name){ document.getElementById('f-name').focus(); return; }

    const p = projects.find(x=>x.id===currentProjectId);
    const category = document.getElementById('f-category').value;
    const finalSubtasks = subtaskDraft.filter(s=>s.name.trim()!=='');
    const derivedProgress = subtaskProgressPct(finalSubtasks);
    let status = document.getElementById('f-status').value;
    let progress;
    if(derivedProgress !== null){
      // Has subtasks: progress is locked to the checked-off percentage, and
      // that percentage decides completed vs In Progress — not the dropdown.
      progress = derivedProgress;
      status = progress === 100 ? 'completed' : (status === 'completed' ? 'inprogress' : status);
    } else {
      // No subtasks: progress is fixed to whatever status was picked.
      progress = status === 'completed' ? 100 : 0;
    }
    const payload = {
      name,
      priority: document.getElementById('f-priority').value,
      assignee: document.getElementById('f-assignee').value.trim(),
      start: document.getElementById('f-start').value,
      deadline: document.getElementById('f-deadline').value,
      repeat: document.getElementById('f-repeat').value,
      remarksLog: remarksDraft.slice(),
      status,
      progress,
      subtasks: finalSubtasks
    };

    if (editingTask && editingTask.taskId){
      const oldCat = editingTask.category;
      const idx = p.tasks[oldCat].findIndex(t=>t.id===editingTask.taskId);
      const existing = p.tasks[oldCat][idx];
      const updated = Object.assign({}, existing, payload);
      p.tasks[oldCat].splice(idx,1);
      p.tasks[category] = p.tasks[category] || [];
      p.tasks[category].push(updated);
    } else {
      p.tasks[category] = p.tasks[category] || [];
      p.tasks[category].push(Object.assign({id:newTaskId(), completed:false}, payload));
    }

    closeTaskModal();
    renderTaskGroups();
    renderDashboard();
    renderCalendar();
  });

  // ---------- PROJECT MODAL ----------
  const PROJECT_STATUS_LABELS = {inprogress:'In Progress', suspended:'Suspended', completed:'Completed'};
  const projectOverlay = document.getElementById('project-modal-overlay');
  let editingProjectId = null;
  let projectIdSeq = 0;
  function newProjectId(){
    projectIdSeq += 1;
    return 'p' + Date.now() + '_' + projectIdSeq;
  }

  function openProjectModal(id){
    editingProjectId = id || null;
    const isEdit = !!id;
    document.getElementById('pm-title').textContent = isEdit ? 'Edit Project' : 'New Project';
    document.getElementById('pm-edit-actions').style.display = isEdit ? 'flex' : 'none';

    if(isEdit){
      const p = projects.find(x=>x.id===id);
      document.getElementById('pm-name').value = p.name;
      document.getElementById('pm-details').value = p.details || '';
      document.getElementById('pm-lead').value = p.lead || '';
      document.getElementById('pm-launch').value = p.launch && /^\d{4}-\d{2}-\d{2}$/.test(p.launch) ? p.launch : '';
      document.getElementById('pm-status').value = p.status || 'inprogress';
      document.getElementById('pm-archive-btn').textContent = p.archived ? '↩ Restore' : '🗄 Archive';
    } else {
      document.getElementById('pm-name').value = '';
      document.getElementById('pm-details').value = '';
      document.getElementById('pm-lead').value = '';
      document.getElementById('pm-launch').value = '';
      document.getElementById('pm-status').value = 'inprogress';
    }
    projectOverlay.classList.add('active');
  }
  function closeProjectModal(){
    projectOverlay.classList.remove('active');
    editingProjectId = null;
  }

  document.getElementById('add-project-btn').addEventListener('click', ()=> openProjectModal(null));
  document.getElementById('pm-cancel-btn').addEventListener('click', closeProjectModal);
  projectOverlay.addEventListener('click', (e)=>{ if(e.target === projectOverlay) closeProjectModal(); });

  document.getElementById('pm-submit-btn').addEventListener('click', ()=>{
    const name = document.getElementById('pm-name').value.trim();
    if(!name){ document.getElementById('pm-name').focus(); return; }
    const status = document.getElementById('pm-status').value;
    const launchRaw = document.getElementById('pm-launch').value;
    const payload = {
      name,
      details: document.getElementById('pm-details').value.trim(),
      lead: document.getElementById('pm-lead').value.trim() || '—',
      launch: launchRaw ? fmtDate(launchRaw) : 'TBD',
      status,
      statusLabel: PROJECT_STATUS_LABELS[status]
    };

    if(editingProjectId){
      const p = projects.find(x=>x.id===editingProjectId);
      Object.assign(p, payload);
      if(currentProjectId === editingProjectId){
        renderDetailHeader(p);
      }
    } else {
      projects.push(Object.assign({
        id: newProjectId(),
        progress: 0,
        archived: false,
        tasks: {},
        dashboard: {ganttDates: [], ganttRows: []}
      }, payload));
    }
    closeProjectModal();
    renderHome();
  });

  document.getElementById('pm-archive-btn').addEventListener('click', ()=>{
    if(!editingProjectId) return;
    const p = projects.find(x=>x.id===editingProjectId);
    const goingToArchive = !p.archived;
    const msg = goingToArchive
      ? `Archive "${p.name}"? You can still view it from the archive without restoring it.`
      : `Restore "${p.name}" from the archive?`;
    confirmAction(msg, ()=>{
      p.archived = !p.archived;
      closeProjectModal();
      renderHome();
    });
  });

  document.getElementById('pm-delete-btn').addEventListener('click', ()=>{
    if(!editingProjectId) return;
    const p = projects.find(x=>x.id===editingProjectId);
    confirmAction(`Delete project "${p.name}" and all of its tasks? This cannot be undone.`, ()=>{
      const idx = projects.findIndex(x=>x.id===editingProjectId);
      if(idx>-1) projects.splice(idx,1);
      closeProjectModal();
      renderHome();
    });
  });

  // ---------- INIT ----------
  renderHome();
