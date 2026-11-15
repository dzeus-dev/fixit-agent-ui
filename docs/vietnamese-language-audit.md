# FixIt Agent — Vietnamese Product Language Audit

## 1. Scope

This is a Phase 0 source audit and baseline for a later Vietnamese-first presentation pass. It records existing English UI copy, proposes Vietnamese wording and terminology rules, and separates user-visible labels from internal values.

No application source was changed. No UI behavior, visual design, routes, state management, business logic, IDs, or state-machine values were changed. No localization framework or locale infrastructure was introduced. The recommendations below are proposals for later phases; they are not translations applied to the prototype.

The audit covered the requested files under src/app/: data.ts, routes.tsx, pages.tsx, incident-detail.tsx, correlation-review.tsx, routing-workflow.tsx, routing-decision.tsx, technician-workflow.tsx, technician-task-state.tsx, resident-workflow.tsx, resident-state.tsx, operational-state.tsx, and App.tsx. I also reviewed components.tsx, the root src/App.tsx, src/main.tsx, src/index.css, and index.html for shared copy, copy-bearing shell elements, or additional rendered content.

Inventory rows consolidate repeated labels and dynamic message variants where the same wording appears in more than one component. They record the material user-facing copy and mock content found during this pass, rather than code identifiers or purely decorative CSS classes.

## 2. Current UI Language Inventory

English appears throughout the prototype, not only in the BQL console. The most copy-dense source files are pages.tsx (entry/login, dashboard, ticket and incident lists, and not-found page), incident-detail.tsx (incident intelligence, verification, resolution review, and traceability), correlation-review.tsx (AI evidence and BQL scope decisions), and the three role workflow files (routing-workflow.tsx, technician-workflow.tsx, and resident-workflow.tsx). components.tsx supplies English navigation, titles, badges, and shared labels to multiple routes. data.ts and the state providers supply English mock records, statuses, timeline events, and fallback values that are rendered directly.

| Surface | Main source | Current English areas | Audience |
|---|---|---|---|
| Entry and demo login | pages.tsx | Role cards, product explanation, demo sign-in, credentials, prototype disclaimer | All roles / prototype users |
| Shared shell | components.tsx | Navigation, page titles, search, notification labels, role names, priority and incident-status badges | BQL, technician, resident |
| BQL operations | pages.tsx | Dashboard metrics, incident activity, ticket and incident tables, queue actions | BQL |
| Incident intelligence | incident-detail.tsx | AI understanding, risk, affected area, evidence, system facts, resolution review, clarification | BQL |
| Correlation review | correlation-review.tsx | Candidate reports, confidence, signals, scope controls, decision evidence | BQL |
| Routing and approval | routing-workflow.tsx, routing-decision.tsx | AI team recommendation, eligibility checks, alternatives, human override, approval/send-back | BQL |
| Technician work | technician-workflow.tsx, technician-task-state.tsx | Task queue, safety, inspection, work evidence, resolution submission | Technician |
| Resident experience | resident-workflow.tsx, resident-state.tsx | Report form, clarification, progress, resolution feedback, resident-safe statuses | Resident |
| Seeded/demo content | data.ts, pages.tsx, workflow files | Sample report descriptions, incident titles, team names, locations, names, mock clock and prototype-state copy | All, depending on screen |
| Error and prototype copy | pages.tsx, components.tsx, role workflows | Not-found message, mock operational clock, prototype access and demo controls | All / prototype users |

routes.tsx, App.tsx, src/main.tsx, and index.html contain little or no ordinary visible English copy. Their route declarations, provider wiring, and document-shell tokens are important technical identifiers and are listed in Section 9.

## 3. Core Terminology Audit

| Concept | Current English | Recommended Vietnamese | Notes |
|---|---|---|---|
| Ticket | Ticket, Tickets, Ticket view, Ticket ID | BQL: **phiếu phản ánh**; resident: **phản ánh** | A ticket is the individually traceable record created from one resident report. Do not call the entity a “sự cố.” |
| Report | Report, resident report, related reports, source reports | **phản ánh**; plural **các phản ánh** | Prefer the simpler “phản ánh” in the resident experience. “Phiếu phản ánh” distinguishes the BQL record where necessary. |
| Incident | Incident, operational incident, incident queue, incident scope | **sự cố** | Reserve this for the operational event that may coordinate multiple reports and response actions. |
| Issue | Issue, issue type, issue resolved, Report an Issue | **vấn đề** in resident prompts; **nội dung phản ánh** or **sự cố** in BQL copy as context requires | Current English “issue” overlaps with resident-reported symptom and an operational incident. Do not use one Vietnamese label for every occurrence. |
| Assignment | Assignment, assigned team, assignment source, assignment status | **phân công**; assigned team: **đội được phân công** | Name the actor when relevant: “BQL đã phân công.” A task may be assigned while the overall incident remains open. |
| Routing | Routing recommendation, routing alternatives, routing review | **điều phối**; recommendation: **đề xuất điều phối** | “Routing” is the BQL process of choosing/confirming the responsible team. Do not imply that AI dispatches or assigns work. |
| Dispatch | Autonomous dispatch, “dispatch” in the decision-boundary explanation | **điều phối tự động** | In the current prototype this is explicitly not performed. Preserve that boundary in later copy. |
| Correlation | Correlation review, correlation confidence, correlation map, correlation-derived | BQL: **liên kết các phản ánh** / **mức độ liên quan** | Prefer plain “liên kết” or “nhóm phản ánh” over technical “tương quan” in primary UI. It indicates a pattern, not proof of common cause. |
| Technician | Technician, Technician action | Role: **nhân viên kỹ thuật**; provenance: **do nhân viên kỹ thuật ghi nhận** | Use execution-oriented language for the person. |
| Maintenance / technical team | Maintenance team, Technical — Plumbing, Technical — Electrical, Vertical Transport | **đội kỹ thuật** plus specialty; resident copy may use **nhân viên kỹ thuật** | Source alternates between “maintenance team” and specialty team names. Standardize team names by specialty and do not conflate a person with a team. |
| Resident | Resident, resident-provided, Resident Portal | **cư dân** | Use “bạn” in resident instructions where a direct, friendly sentence is clearer. |
| BQL / Dispatcher | BQL, Dispatcher, Building management, Human | First role reference: **Ban Quản lý (BQL)**; thereafter **BQL** | “Dispatcher” is not a good resident-facing role name. In role selection use “BQL” or “Nhân viên BQL”; use “điều phối” for the action, not the person’s title. |
| AI Understanding | AI Understanding, AI-generated interpretation | **Nhận định của AI** or **AI phân tích** | Present as a suggestion/interpretation, not a verified fact or final finding. |
| AI Recommendation | AI recommendation, AI-generated, Eligible recommendation | **Đề xuất của AI** | “Eligible recommendation” should mean the proposal passed eligibility checks, not that it is already approved or assigned. |
| System Verification | System Verification, System checks, All required checks passed | **Kiểm tra điều kiện hệ thống** | The check confirms eligibility/capability/location/workflow constraints; it does not make the BQL decision or create an assignment. |
| System record / verified facts | System record, System-verified Facts, operational record | **Ghi nhận của hệ thống** / **Thông tin hệ thống đã kiểm tra** | Reserve “đã xác minh” for facts the system actually validates. System provenance does not guarantee every user-entered value is true. |
| Human decision | Human decision, Human override, BQL decision | **Quyết định của BQL**; override: **BQL điều chỉnh đề xuất** | Avoid the literal “con người” label in product copy when the accountable actor is specifically BQL. |
| Priority | Critical, High, Medium, Low; Priority | **Mức độ ưu tiên**: Khẩn cấp, Cao, Trung bình, Thấp | Keep this separate from likelihood/risk and SLA urgency. |
| Risk | Risk, SLA Risk, At risk, Breached | **Rủi ro**; SLA risk: **nguy cơ trễ hạn SLA** | “Rủi ro” is not the same as incident priority. |
| SLA | SLA, SLA state, Mock operational clock | Keep **SLA** for BQL/technician; optionally explain on first use as **thời hạn xử lý (SLA)** | Resident UI should give a plain status or expected next update, not expose internal SLA language. |
| Resolution | Resolution, Resolution note, resolution review, Confirm resolution | **Kết quả xử lý**; action: **xác nhận kết quả xử lý** | Distinguish a technician-recorded outcome from the later BQL closure decision. |
| Follow-up | Follow-up required, request follow-up, additional work is required | BQL/technician: **cần xử lý tiếp**; resident: **cần xử lý thêm** | Use the resident phrasing in resident notifications; use execution phrasing in task status. |
| Approval | Pending Approval, BQL approval required, approval review | **Chờ BQL phê duyệt** / **BQL cần phê duyệt** | Name BQL as the decision maker where a status alone could be misunderstood. |
| Related reports | Related reports, supporting reports, source reports | **các phản ánh liên quan** | Canonical for the BQL and technician context; the resident may only need “các phản ánh tương tự trong tòa nhà” if disclosure is appropriate. |
| Affected area | Correlated affected area, affected area confirmed | **phạm vi ảnh hưởng** | Distinguish the AI/correlation-derived scope from the official recorded location and from technician-confirmed scope. |
| Official location | Official location, Location on record | **vị trí ghi nhận chính thức** or concise **vị trí ghi nhận** | Keep separate from the estimated or correlation-derived affected area. |

### Consistency findings

- The application uses “ticket” for the stored individual record and “report” for the resident’s description, but also mixes “related tickets,” “related reports,” and “supporting reports” for the same incident-linked items.
- “Incident” and “issue” overlap in generic headlines and resident status copy. “Incident” should mean the BQL operational record; “issue” should describe what the resident noticed unless the copy is explicitly about the operational incident.
- “Assignment” and “routing” are adjacent but not synonymous. Routing is the decision workflow; assignment is created only after BQL confirms.
- “Maintenance team,” “Technical — Plumbing/Electrical/HVAC,” “Vertical Transport,” and “assigned team” mix people, team, and capability. Canonicalize specialty team names and keep people labeled as “nhân viên kỹ thuật.”
- “Resolved” is overloaded: it can be a technician task result, a technician resolution choice, a resident-facing outcome, and a BQL-closed incident. These need context-specific display labels even while the internal value stays unchanged.
- “Correlation” is presented as confidence and relationship evidence, while copy also correctly says it does not prove a shared physical root cause. Keep that qualification near any later explanation.
- officialLocation and correlatedAffectedArea are already separate data concepts. Their Vietnamese labels must preserve the difference.

## 4. Status Mapping Proposal

These are display-label proposals only. Internal values, unions, comparisons, and transitions must stay exactly as they are in source. A presentation mapping should use the context/audience column, since one English internal value can represent different stages in different workflows.

| Internal State | Vietnamese UI Label | Audience | Notes |
|---|---|---|---|
| Open | Mới tiếp nhận | BQL | Ticket/incident queue; distinguish from “Report received” resident wording. |
| Pending Approval | Chờ BQL phê duyệt | BQL | Routing/incident approval state. |
| Assigned | Đã phân công | BQL | Incident/task assignment; do not imply work has started. |
| In Progress | Đang xử lý | BQL | Incident status. |
| In Progress | Đang thực hiện | Technician | Task execution status. |
| In Progress | Nhân viên kỹ thuật đang xử lý | Resident | ResidentStatus’s longer, resident-friendly counterpart is already “Maintenance team is working on it.” |
| Resolution Review | Chờ BQL duyệt kết quả | BQL | Technician has recorded a result; incident is not yet closed. |
| Under Review | Đang được xem xét | BQL | Current ticket status in the queue. |
| Resolved (incident after BQL confirmation) | Đã đóng sau khi BQL xác nhận | BQL | This is the final incident state in the operational state provider. Prefer concise UI “Đã đóng” if context makes closure clear. |
| Resolved (task status) | Đã ghi nhận hoàn tất | Technician | Task result does not close the incident. |
| Resolved (technician resolution choice) | Đã xử lý | Technician | A submitted resolution result pending BQL review. |
| Needs Follow-up | Cần xử lý tiếp | Technician / BQL | Task needs additional work or review. |
| Unable to resolve | Chưa xử lý được | Technician | Technician resolution choice. |
| Requires follow-up | Cần xử lý tiếp | Technician | Resolution choice; standardize with “Needs Follow-up” in display while retaining both values. |
| Yes | Có | Technician | Affected-area confirmation. |
| No | Không | Technician | Affected-area confirmation. |
| Needs further inspection | Cần kiểm tra thêm | Technician | Affected-area confirmation. |
| Report received | Đã nhận phản ánh | Resident | Resident-facing progress. |
| Being reviewed | Đang xem xét phản ánh | Resident | Keep this simpler than internal BQL approval language. |
| Maintenance team assigned | Đã sắp xếp nhân viên kỹ thuật | Resident | Avoid exposing internal routing mechanics. |
| Maintenance team is working on it | Nhân viên kỹ thuật đang xử lý | Resident | Plain status update. |
| Resolution is being reviewed | BQL đang xem xét kết quả xử lý | Resident | Makes clear the technician’s work is complete but BQL review remains. |
| Issue resolved | Đã xử lý xong | Resident | Show only after the BQL’s final review/confirmation. |
| Follow-up required | Cần xử lý thêm | Resident | State that the building team is reviewing next steps without promising a time. |
| More information needed | Cần thêm thông tin | Resident | Pair with a direct question and explain why it is needed. |
| Additional safety review required | Cần kiểm tra an toàn thêm | Resident | Include the actionable safety instruction to avoid the affected area if it appears unsafe. |
| Approved | Đã được BQL phê duyệt | BQL | Routing decision status; make the actor explicit. |
| Changed | BQL đã điều chỉnh đề xuất | BQL | BQL selected a different team from the AI recommendation. |
| Sent Back | Đã trả lại để xem xét | BQL | Routing decision returned for review; keep reason visible. |
| Pending | Chờ BQL xem xét | BQL | bqlReviewStatus; internal review state, not the same as Pending Approval. |
| Reviewed | Đã xem xét | BQL | bqlReviewStatus; review occurred but does not necessarily mean incident closed. |
| Closed | Đã đóng | BQL | bqlReviewStatus; distinguish from technician task resolution. |
| Linked | Đã liên kết | BQL | Correlation scope list. |
| Candidate | Chờ xem xét liên kết | BQL | Candidate report remains separate until BQL changes scope. |
| Excluded | Đã loại khỏi phạm vi | BQL | Correlation scope list; not a resident-facing status. |
| High / Medium / Low correlation strength | Mức độ liên quan cao / trung bình / thấp | BQL | Do not show correlation strength/confidence to residents. |
| Critical / High / Medium / Low priority | Khẩn cấp / Cao / Trung bình / Thấp | BQL / Technician | Pair with “Mức độ ưu tiên.” |
| On track | Đang trong hạn | BQL / Technician | SLA state. |
| At risk | Có nguy cơ trễ hạn | BQL / Technician | SLA state; do not expose internal SLA to resident. |
| Breached | Quá hạn SLA | BQL / Technician | SLA state; avoid the bare English-derived concept “vi phạm” without context. |

### Overlapping state concepts

- Status in data.ts is used for incident and ticket records; HeroIncidentStatus covers a narrower live incident workflow. They overlap on Pending Approval, Assigned, In Progress, Resolution Review, and Resolved.
- TaskStatus, ResolutionStatus, and incident Status all contain “Resolved,” but their actors and consequences differ. Technician task completion does not close the incident.
- ResolutionStatus has “Requires follow-up,” while TaskStatus uses “Needs Follow-up.” These are separate internal strings with overlapping display meaning.
- ResidentStatus is a resident-facing progression, while operational and routing states include internal approval and review detail. Do not expose those internal unions directly in resident copy.
- routingStatus / RoutingDecisionStatus contain Pending Approval, Approved, Changed, and Sent Back. These are decision states, not incident lifecycle labels.
- bqlReviewStatus Pending / Reviewed / Closed is a review record. Closed is not a synonym for technician Resolved.
- Correlation Linked / Candidate / Excluded, correlation strength High / Medium / Low, priorities, and SLA states are separate label families. Do not collapse them into a generic status.
- The resident prototype selector contains the resident status set only. It is an explicitly labeled demo control, but it can still change the simulated resident view and should be treated as prototype-only.

## 5. AI / System / Human Language

| Boundary | Current wording | Recommended Vietnamese | Rule |
|---|---|---|---|
| AI | “AI Understanding”; “AI-generated”; “AI-generated interpretation” | “Nhận định của AI”; “AI tạo nội dung” only where provenance matters | Mark conclusions as estimates or recommendations. Avoid phrasing that reads as a verified diagnosis. |
| AI | “AI recommendation”; “Suggested incident scope”; “The system found a strong relationship…” | “Đề xuất của AI”; “Phạm vi sự cố AI đề xuất”; explain that evidence indicates a possible relationship | AI can suggest a team or related-report scope. It must not be described as having confirmed scope or made the final decision. |
| AI | “High correlation confidence”; “Confidence explanation” | “Mức độ liên quan: cao”; “Vì sao AI đưa ra nhận định này” | Keep confidence language in BQL context. A relationship pattern is not proof of common physical root cause. |
| System | “System Verification”; “Deterministic eligibility checks” | “Kiểm tra điều kiện hệ thống” | Explain the scope of the checks in plain terms: skill/capability, property coverage, incident location, workflow eligibility. |
| System | “All required checks passed”; “These checks validate eligibility only. They do not assign the team.” | “Đã đạt các điều kiện kiểm tra”; “Các kiểm tra chỉ xác nhận đủ điều kiện, không tự phân công đội.” | Preserve the explicit boundary that a pass is not an assignment. |
| System | “System record”; “System-verified Facts”; “Operational record” | “Ghi nhận của hệ thống”; “Thông tin hệ thống đã kiểm tra” | Do not imply system verification for AI-derived scope or resident-entered descriptions. |
| Human / BQL | “Incident formation is a BQL-controlled decision.” | “BQL quyết định phạm vi liên kết thành sự cố.” | BQL owns incident formation and report-link scope. |
| Human / BQL | “BQL approval required”; “BQL Decision”; “Pending BQL approval” | “BQL cần phê duyệt”; “Quyết định của BQL”; “Chờ BQL phê duyệt” | Name BQL as approver; avoid generic or ambiguous “approval.” |
| Human / BQL | “Human override prepared”; “Human override”; “BQL changed the recommended team…” | “BQL đã chọn phương án khác”; “BQL điều chỉnh đề xuất” | Explain that selection alone does not create assignment; explicit confirmation does. |
| Human / BQL | “Human decision”; “Decision recorded by BQL”; “Last human decision” | “Quyết định của BQL”; “BQL đã ghi nhận quyết định” | Prefer the accountable role over the generic label “Human.” |
| Technician → BQL | “Resolution recorded by the technician”; “Submitted for BQL review. No reassignment was created.” | “Nhân viên kỹ thuật đã ghi nhận kết quả”; “Đã gửi BQL xem xét; chưa tạo phân công mới.” | Technician records work and outcome. Technician completion is not incident closure or reassignment. |
| BQL closure | “Confirm resolution”; “BQL remains responsible for final operational review and closure.” | “Xác nhận kết quả xử lý”; “BQL chịu trách nhiệm xem xét cuối cùng và đóng sự cố.” | Only BQL closes the incident after reviewing technician evidence. |
| Resident visibility | “Building management review requested”; resident progress/status messages | “Đã chuyển BQL xem xét” if the resident needs this fact | Tell the resident what happens next, not internal controls, assignment alternatives, workload, correlation scores, or provenance. |

The product principle is consistent with several explicit source statements:

> AI recommends → System verifies → BQL decides → Technician executes → BQL closes → Resident knows

The BQL dashboard says “AI recommends → System verifies → Human decides.” The routing screen says the checks do not assign the team and that BQL must approve the final team. Correlation copy says BQL controls incident formation and that correlation does not prove a shared physical root cause. Technician copy says resolving the task does not close the incident and that BQL remains responsible for final review and closure. These are good boundary statements to retain and translate prominently.

One caution: generic “AI-generated,” “System record,” and “Human decision” provenance tags are repeated even where the surrounding context is sufficient. In Vietnamese, retain concise source labels where they help explain accountability, but do not make every resident-facing sentence sound like an internal audit record.

## 6. Role-specific Language

### BQL

BQL screens can use precise operational terms: **sự cố**, **phản ánh liên quan**, **liên kết phản ánh**, **điều phối**, **phê duyệt**, **SLA**, **phạm vi ảnh hưởng**, and **kiểm tra điều kiện hệ thống**. Keep AI recommendation, system eligibility, BQL decision, technician action, and BQL final review visibly distinct.

The current BQL UI contains useful explicit explanations, such as “Candidates remain separate until BQL explicitly changes the incident scope,” “Selection is not an assignment,” and “No workforce optimization or autonomous dispatch is performed in this prototype.” Keep the actor and the consequence in the Vietnamese wording. Avoid using “correlation confidence” as an unqualified fact.

### Nhân viên kỹ thuật

Use short, execution-oriented language: task, assigned team, location, inspection checklist, safety instruction, action taken, finding, affected area, result, and reason for escalation. Recommended patterns include **Việc cần làm**, **Bắt đầu công việc**, **Ghi nhận kết quả xử lý**, and **Cần BQL xem xét**.

The technician screen currently labels context as “Read-only orchestration context,” “Information Provenance,” and “Operational evidence.” These are internal product terms; translate them in practical language (“Thông tin sự cố — chỉ xem”, “Nguồn thông tin”, “Thông tin phục vụ xử lý”). The safety note is direct and actionable and should remain so. Preserve the clear rule that the technician can record work but cannot independently close the incident.

### Cư dân

Use simple terms centered on the resident’s report and next step: **Gửi phản ánh**, **Đã nhận phản ánh**, **Đang xem xét**, **Nhân viên kỹ thuật đang xử lý**, **Cần thêm thông tin**, and **Cần xử lý thêm**. Prefer short sentences, explain what the resident should do, and do not promise a completion time that the workflow does not provide.

The normal resident flow avoids correlation score, routing alternatives, technician workload, internal SLA, AI confidence, provenance detail, and BQL approval controls. The related-building-issue message (“This issue is being coordinated with other reports in your building”) gives context without exposing other residents’ report contents; preserve that privacy pattern.

The “Prototype / Demo control” disclosure and its status selector appear inside the resident experience. The helper says “Preview resident-safe states without exposing internal workflow controls,” and the selector offers resident-safe statuses, but this is still a demo/debug affordance that can alter the displayed simulated state. Keep it out of any resident presentation release unless a dedicated prototype demonstration needs it.

## 7. English Leakage Inventory

The tables below record significant source wording, location/context, intended audience, translation recommendation, terminology category, and whether the wording should be standardized. Repeated labels are consolidated; data examples are listed explicitly where they are visible mock content.

### Shared

| Current English text | File / context | Audience | Recommended Vietnamese | Category | Standardize? |
|---|---|---|---|---|---|
| “Overview”; “Operations”; “System”; “Workspace”; “Resident portal” | components.tsx / sidebar section labels | Role-specific | “Tổng quan”; “Vận hành”; “Hệ thống”; “Không gian làm việc”; “Cổng cư dân” | Navigation | Yes; keep sections consistent across roles. |
| “Dashboard”; “Tickets”; “Incidents”; “Notifications”; “Soon”; “Settings” | components.tsx / BQL navigation | BQL | “Bảng điều khiển”; “Phiếu phản ánh”; “Sự cố”; “Thông báo”; “Sắp có”; “Cài đặt” | Navigation | Yes. |
| “My Tasks”; “My Reports”; “Track Report”; “Switch workspace” | components.tsx / technician and resident navigation | Technician / Resident | “Việc của tôi”; “Phản ánh của tôi”; “Theo dõi phản ánh”; “Chuyển không gian làm việc” | Navigation | Yes; resident labels should be plain. |
| “Operations Dashboard”; “Resident Tickets”; “Incident Queue”; “Correlation Review”; “Routing Recommendation”; “Approval Review”; “Incident Detail”; “Task Detail”; “Report Status”; “Report an Issue” | components.tsx / top-bar titles | All, route-dependent | “Bảng điều khiển vận hành”; “Phiếu phản ánh cư dân”; “Danh sách sự cố”; “Xem xét liên kết phản ánh”; “Đề xuất điều phối”; “Xem xét phê duyệt”; “Chi tiết sự cố”; “Chi tiết công việc”; “Trạng thái phản ánh”; “Gửi phản ánh sự cố” | Page titles | Yes; match each navigation/page heading. |
| “BQL / Dispatcher”; “Technician”; “Resident” | components.tsx, pages.tsx / role display and role picker | All | “BQL”; “Nhân viên kỹ thuật”; “Cư dân” | Role names | Yes; do not translate BQL as dispatcher in resident copy. |
| “Demo sign in”; “Secure workspace”; “Welcome back”; “Sign in to continue to the FixIt Agent prototype.”; “Email address”; “Password”; “Demo role”; “Sign In”; “Prototype access only. No real authentication is performed.” | pages.tsx / entry and login | All / prototype users | “Đăng nhập bản mẫu”; “Không gian làm việc bảo mật”; “Chào mừng bạn trở lại”; “Đăng nhập để tiếp tục vào bản mẫu FixIt Agent”; “Địa chỉ email”; “Mật khẩu”; “Vai trò dùng thử”; “Đăng nhập”; “Chỉ dùng bản mẫu. Không có xác thực tài khoản thật.” | Login/demo | Yes; keep the prototype/authentication disclosure clear. |
| “AI-assisted Incident Orchestration for Residential Operations”; “Move from fragmented reports to controlled, coordinated resolution—without removing human judgment.” | pages.tsx / login-side product statement | All | “Điều phối sự cố có AI hỗ trợ cho hoạt động khu dân cư”; “Chuyển các phản ánh rời rạc thành quy trình xử lý có phối hợp và kiểm soát, vẫn giữ quyền quyết định của con người.” | Product explanation | Yes; preserve human decision ownership. |
| “Review assigned work, capture evidence, and update task progress.”; “Enter Technician Workspace”; “Report an issue and follow its status through resolution.”; “Enter Resident Portal” | pages.tsx / Technician and Resident role cards | All | “Xem công việc được phân công, ghi nhận bằng chứng và cập nhật tiến độ”; “Vào không gian làm việc kỹ thuật”; “Gửi phản ánh và theo dõi tiến độ xử lý”; “Vào cổng cư dân” | Role entry | Yes; use the same role names and verbs throughout. |
| “Close navigation”; “Notifications”; “Search your reports…”; “Search incidents, tickets…” | components.tsx / accessible labels and search | All | “Đóng menu”; “Thông báo”; “Tìm phản ánh của bạn…”; “Tìm sự cố, phiếu phản ánh…” | Accessibility / utility | Yes; translate accessible names too. |
| “Critical”; “High”; “Medium”; “Low”; “Open”; “Pending Approval”; “Assigned”; “In Progress”; “Resolution Review”; “Under Review”; “Resolved” | components.tsx / badges | BQL | Use context-aware labels from Section 4 | Priority/status | Yes; never display raw union values by default. |
| “AI-generated”; “System record”; “Human decision”; “Human override”; “Technician action”; “Correlation-derived” | Shared provenance badges in workflow files | BQL / Technician | “AI tạo/đề xuất”; “Ghi nhận của hệ thống”; “Quyết định của BQL”; “BQL điều chỉnh đề xuất”; “Nhân viên kỹ thuật ghi nhận”; “Suy ra từ liên kết phản ánh” | Provenance | Yes; standardize actor/source labels. |
| “At risk”; “On track”; “Breached”; “SLA”; “Mock operational clock” | pages.tsx, incident-detail.tsx, technician-workflow.tsx | BQL / Technician | “Có nguy cơ trễ hạn”; “Đang trong hạn”; “Quá hạn SLA”; “SLA”; “Đồng hồ vận hành mô phỏng” | SLA / prototype | Yes; omit internal SLA detail from resident UI. |
| “Sunrise Residence”; “Aisha Malik”; “Daniel Kim”; “Jordan Reed” | components.tsx, mock records | All, screen-dependent | Preserve proper names as written | Proper names | Yes; do not translate names. |
| “Page not found”; “The workspace route you requested does not exist.”; “Return to role selector” | pages.tsx / not-found page | All | “Không tìm thấy trang”; “Đường dẫn không tồn tại.”; “Quay lại chọn vai trò” | Error | Yes. |

### BQL

| Current English text | File / context | Audience | Recommended Vietnamese | Category | Standardize? |
|---|---|---|---|---|---|
| “Incident orchestration, with people in control”; “Turn resident reports into coordinated action.”; “FixIt Agent helps property operations teams correlate tickets, manage incidents, and make faster, evidence-led decisions.” | pages.tsx / entry screen | All | “Điều phối sự cố, con người luôn quyết định”; “Kết nối phản ánh của cư dân thành hành động phối hợp”; “FixIt Agent giúp đội vận hành liên kết phiếu phản ánh, quản lý sự cố và đưa ra quyết định nhanh hơn dựa trên bằng chứng.” | Product explanation | Yes; preserve human accountability. |
| “Triage reports, coordinate incidents, and approve operational decisions.”; “Enter BQL Console” | pages.tsx / BQL role card | All | “Phân loại phản ánh, điều phối xử lý sự cố và phê duyệt quyết định vận hành”; “Vào hệ thống BQL” | Role entry | Yes. |
| “Human approval built in”; “Operational context preserved”; “Evidence-led workflows” | pages.tsx / entry assurances | All | “Có bước BQL phê duyệt”; “Giữ nguyên bối cảnh vận hành”; “Quy trình dựa trên bằng chứng” | Product principles | Yes; name BQL rather than generic human where possible. |
| “BQL Operations”; “Monitor incidents, approvals and SLA risk across the property.”; “Review incident queue” | pages.tsx / dashboard header | BQL | “Vận hành BQL”; “Theo dõi sự cố, phê duyệt và nguy cơ trễ hạn SLA trong toàn khu nhà”; “Xem danh sách sự cố” | Dashboard | Yes. |
| “Attention summary”; “Updated just now”; “Critical incidents”; “Require immediate attention”; “Pending approval”; “Human decision required”; “SLA at risk”; “Needs action soon”; “Open incidents”; “Currently being handled” | pages.tsx / dashboard metrics | BQL | “Tổng quan cần chú ý”; “Vừa cập nhật”; “Sự cố khẩn cấp”; “Cần xử lý ngay”; “Chờ phê duyệt”; “Cần BQL quyết định”; “SLA có nguy cơ trễ”; “Cần xử lý sớm”; “Sự cố đang mở”; “Đang được xử lý” | Dashboard/status | Yes; map “human” to BQL. |
| “Needs Attention Now”; “Highest-priority incidents, ordered by operational urgency.”; “actions due”; “Recommended next action” | pages.tsx / attention card and rows | BQL | “Cần chú ý ngay”; “Sắp xếp các sự cố ưu tiên cao theo mức độ khẩn cấp trong vận hành”; “việc cần xử lý”; “Hành động tiếp theo được đề xuất” | Dashboard | Yes. |
| “Critical Incidents”; “Immediate attention”; “Review”; “Pending Human Approval”; “BQL decision required”; “AI recommendation”; “Review approval” | pages.tsx / dashboard columns | BQL | “Sự cố khẩn cấp”; “Cần xử lý ngay”; “Xem”; “Chờ BQL phê duyệt”; “Cần BQL quyết định”; “Đề xuất của AI”; “Xem xét phê duyệt” | Dashboard / approval | Yes. |
| “SLA Risk”; “Incident updates”; “Recent activity”; “Open incident”; “Electrical team started work”; “Plumbing assignment approved by BQL”; “Technician work started”; “Technician outcome awaiting BQL review”; “Resolution confirmed by BQL” | pages.tsx / dashboard risk and activity feed | BQL | “Rủi ro SLA”; “Cập nhật sự cố”; “Hoạt động gần đây”; “Mở sự cố”; “Đội điện bắt đầu xử lý”; “BQL phê duyệt phân công đội cấp thoát nước”; “Nhân viên kỹ thuật bắt đầu xử lý”; “Chờ BQL xem xét kết quả”; “BQL xác nhận kết quả xử lý” | Dashboard activity | Yes; keep actor and completion stage explicit. |
| “Tickets”; “Each ticket is one resident’s report. Tickets may be correlated into a single operational incident.”; “Export queue”; “Ticket view”; “Reports remain individually traceable even when related to an incident.” | pages.tsx / ticket page | BQL | “Phiếu phản ánh”; “Mỗi phiếu là một phản ánh của cư dân. Nhiều phiếu có thể được liên kết với cùng một sự cố vận hành.”; “Xuất danh sách”; “Danh sách phiếu phản ánh”; “Mỗi phản ánh vẫn được theo dõi riêng dù có liên quan đến một sự cố.” | Ticket/report | Yes; canonicalize ticket vs report. |
| “Ticket ID”; “Issue”; “Location”; “Category”; “Priority”; “Status”; “Created”; “Related incident”; “Not linked” | pages.tsx / ticket table | BQL | “Mã phiếu”; “Nội dung phản ánh”; “Vị trí”; “Danh mục”; “Mức độ ưu tiên”; “Trạng thái”; “Thời điểm tạo”; “Sự cố liên quan”; “Chưa liên kết” | Table labels | Yes. |
| “Operational problems”; “Incidents”; “Prioritize, approve, and coordinate the operational response across related resident tickets.”; “Review pending approvals”; “Incident view”; “One incident can coordinate multiple related tickets and response actions.” | pages.tsx / incident list | BQL | “Sự cố vận hành”; “Sự cố”; “Ưu tiên, phê duyệt và điều phối xử lý các phiếu phản ánh liên quan”; “Xem các mục chờ phê duyệt”; “Danh sách sự cố”; “Một sự cố có thể điều phối nhiều phiếu phản ánh và hành động xử lý liên quan.” | Incident / coordination | Yes. |
| “Incident”; “Related tickets”; “Assigned team”; “SLA” | pages.tsx / incident table | BQL | “Sự cố”; “Phiếu phản ánh liên quan”; “Đội được phân công”; “SLA” | Table labels | Yes. |
| “Back to incidents”; “Operational incident”; “Incident Summary”; “Operational context”; “What happened”; “Impact”; “Current state” | incident-detail.tsx / incident header and summary | BQL | “Quay lại danh sách sự cố”; “Sự cố vận hành”; “Tóm tắt sự cố”; “Bối cảnh vận hành”; “Diễn biến”; “Ảnh hưởng”; “Trạng thái hiện tại” | Incident detail | Yes. |
| “Correlated affected area”; “AI Understanding”; “Why these reports are related”; “Related Reports” | incident-detail.tsx / scope and analysis panels | BQL | “Phạm vi ảnh hưởng suy ra từ các phản ánh”; “Nhận định của AI”; “Vì sao các phản ánh này có liên quan”; “Các phản ánh liên quan” | AI / correlation | Yes; separate official location from inferred area. |
| “Risk & Priority Assessment”; “AI + operational rules”; “Information Gaps”; “Clarification may be required”; “Suggested clarification” | incident-detail.tsx / assessment and gaps | BQL | “Đánh giá rủi ro và mức độ ưu tiên”; “AI và quy tắc vận hành”; “Thông tin còn thiếu”; “Có thể cần làm rõ”; “Gợi ý nội dung cần xác minh” | Assessment | Yes. |
| “Resolution Review”; “Task status”; “Resolution status”; “Resolution note”; “Finding”; “Affected area confirmed”; “Current incident state”; “Confirm resolution”; “Follow-up requested by BQL” | incident-detail.tsx / BQL resolution panel | BQL | “Xem xét kết quả xử lý”; “Trạng thái công việc”; “Trạng thái kết quả xử lý”; “Ghi chú xử lý”; “Phát hiện”; “Đã xác nhận phạm vi ảnh hưởng”; “Trạng thái sự cố”; “Xác nhận kết quả xử lý”; “BQL yêu cầu xử lý tiếp” | Resolution / BQL closure | Yes; explicitly separate task result from incident closure. |
| “Operational Timeline”; “Incident traceability”; “System-verified Facts”; “Operational record”; “Location on record”; “SLA state”; “Current team” | incident-detail.tsx / timeline and system facts | BQL | “Diễn biến xử lý”; “Lịch sử sự cố”; “Thông tin hệ thống đã kiểm tra”; “Hồ sơ vận hành”; “Vị trí ghi nhận”; “Trạng thái SLA”; “Đội hiện tại” | Audit trail / system | Yes. |
| “Evidence & Traceability”; “Source reports”; “AI extraction”; “Priority assessment”; “Last human decision”; “Routing recommendation”; “Required skill”; “Current owner” | incident-detail.tsx / provenance panel | BQL | “Bằng chứng và lịch sử”; “Phản ánh nguồn”; “Thông tin AI trích xuất”; “Đánh giá mức độ ưu tiên”; “Quyết định gần nhất của BQL”; “Đề xuất điều phối”; “Kỹ năng cần có”; “Đơn vị đang phụ trách” | Traceability | Yes; replace generic “human” with BQL. |
| “Correlation Review”; “Review how resident reports are related before confirming the incident scope.”; “Incident formation is a BQL-controlled decision.”; “Suggested incident scope”; “The system found a strong relationship…” | correlation-review.tsx / scope review | BQL | “Xem xét liên kết phản ánh”; “Xem xét mối liên hệ giữa các phản ánh trước khi xác nhận phạm vi sự cố”; “BQL quyết định việc liên kết thành sự cố”; “Phạm vi sự cố được đề xuất”; “Hệ thống nhận thấy các phản ánh có nhiều điểm tương đồng…” | Correlation | Yes; retain uncertainty and BQL confirmation. |
| “Confidence explanation”; “Multiple independent reports describe similar symptoms in nearby locations within a short time window.”; “Correlation Map”; “Potential shared operational event” | correlation-review.tsx / evidence map | BQL | “Lý do đánh giá mức độ liên quan”; “Nhiều phản ánh độc lập mô tả dấu hiệu tương tự ở các vị trí gần nhau trong thời gian ngắn”; “Sơ đồ liên kết phản ánh”; “Có thể là cùng một sự cố vận hành” | Evidence | Yes; preserve “có thể.” |
| “Currently linked to incident”; “Resident tickets currently included in the proposed incident scope.”; “Potentially related reports”; “Candidates remain separate until BQL explicitly changes the incident scope.” | correlation-review.tsx / candidate lists | BQL | “Đang liên kết với sự cố”; “Các phiếu phản ánh hiện nằm trong phạm vi sự cố được đề xuất”; “Phản ánh có thể liên quan”; “Các phản ánh vẫn tách riêng cho đến khi BQL chủ động thay đổi phạm vi sự cố.” | Correlation scope | Yes. |
| “Different issue category despite being in the same property.”; “Removed from the linked scope by BQL.”; “This report has a different category and lower correlation strength. Confirm before linking it as a human override.” | correlation-review.tsx / warnings | BQL | “Khác danh mục dù cùng khu nhà”; “BQL đã loại khỏi phạm vi liên kết”; “Phản ánh này khác danh mục và có mức độ liên quan thấp hơn. Hãy xác nhận trước khi liên kết theo quyết định của BQL.” | Warning / override | Yes; state why an exception is being made. |
| “Confirm incident scope”; “Incident scope confirmed”; “Correlation rejected”; “The selected reports will not be treated as one incident in this prototype.”; “Confirm correlation”; “Adjust scope”; “Reject correlation” | correlation-review.tsx / decision card | BQL | “Xác nhận phạm vi sự cố”; “Đã xác nhận phạm vi sự cố”; “Đã từ chối liên kết”; “Các phản ánh đã chọn sẽ không được xem là cùng một sự cố trong bản mẫu này”; “Xác nhận liên kết”; “Điều chỉnh phạm vi”; “Từ chối liên kết” | Human decision | Yes. |
| “Correlation identifies relationship patterns. It does not diagnose a root cause, merge reports autonomously, or assign operational work.” | correlation-review.tsx / decision boundary | BQL | “Liên kết phản ánh chỉ nhận diện các dấu hiệu có liên quan. Hệ thống không tự chẩn đoán nguyên nhân gốc, gộp phản ánh hay phân công công việc.” | Boundary | Yes; essential limitation. |
| “Routing Recommendation”; “Review the recommended capability and deterministic checks before BQL approval.”; “AI recommendation”; “Eligible recommendation”; “Recommendation matches current team.” | routing-workflow.tsx / recommendation | BQL | “Đề xuất điều phối”; “Xem xét năng lực được đề xuất và các điều kiện kiểm tra trước khi BQL phê duyệt”; “Đề xuất của AI”; “Đề xuất đáp ứng điều kiện”; “Đề xuất trùng với đội hiện tại” | Routing / AI | Yes; “eligible” does not mean assigned. |
| “System Verification”; “Deterministic eligibility checks”; “All required checks passed”; “These checks validate eligibility only. They do not assign the team.” | routing-workflow.tsx / verification | BQL | “Kiểm tra điều kiện hệ thống”; “Kiểm tra điều kiện theo quy tắc”; “Đã đạt các điều kiện kiểm tra”; “Các kiểm tra chỉ xác nhận đủ điều kiện, không tự phân công đội.” | System | Yes. |
| “Routing Alternatives”; “Small BQL override set”; “Recommended from incident category and symptoms”; “Available as a manual BQL alternative”; “Human override prepared”; “Assignment will not be created until it is explicitly confirmed on the approval step.” | routing-workflow.tsx / alternatives | BQL | “Các phương án điều phối”; “Một số phương án BQL có thể chọn”; “Đề xuất dựa trên danh mục và dấu hiệu của sự cố”; “Phương án khác do BQL chọn”; “BQL đang điều chỉnh đề xuất”; “Chỉ tạo phân công sau khi BQL xác nhận ở bước phê duyệt.” | Routing / override | Yes. |
| “BQL approval required”; “Decision boundary”; “Selection is not an assignment. BQL must approve the final team.”; “No workforce optimization or autonomous dispatch is performed in this prototype.” | routing-workflow.tsx / next decision | BQL | “BQL cần phê duyệt”; “Giới hạn quyết định”; “Việc chọn đội chưa tạo phân công. BQL cần phê duyệt đội cuối cùng”; “Bản mẫu này không tối ưu nhân lực hay tự động điều phối đội.” | Approval / boundary | Yes; important to keep explicit. |
| “BQL Decision”; “Select a reason”; “Insufficient information”; “Wrong category”; “Wrong team recommendation”; “Location requires verification”; “Other” | routing-workflow.tsx / approval and send-back form | BQL | “Quyết định của BQL”; “Chọn lý do”; “Chưa đủ thông tin”; “Sai danh mục”; “Đề xuất sai đội”; “Cần xác minh vị trí”; “Khác” | Form / review | Yes. |
| “Routing sent back for review”; “Reason”; “Decision Evidence”; “Recommendation + verification”; “Incident & SLA Context” | routing-workflow.tsx / send-back and approval | BQL | “Đã trả lại đề xuất điều phối để xem xét”; “Lý do”; “Bằng chứng cho quyết định”; “Đề xuất và kiểm tra”; “Bối cảnh sự cố và SLA” | Approval | Yes. |

### Technician

| Current English text | File / context | Audience | Recommended Vietnamese | Category | Standardize? |
|---|---|---|---|---|---|
| “Today’s operational assignments”; “Execution queue”; “Human-approved assignment”; “BQL-approved routing”; “Assigned team”; “Assignment source” | technician-workflow.tsx / task queue and task header | Technician | “Các công việc được phân công hôm nay”; “Danh sách công việc”; “BQL đã phê duyệt phân công”; “Điều phối đã được BQL phê duyệt”; “Đội được phân công”; “Nguồn phân công” | Work queue | Yes; keep actor explicit. |
| “Start task”; “Back to task queue”; “View task”; “Task started”; “Work in progress” | technician-workflow.tsx / task actions | Technician | “Bắt đầu công việc”; “Quay lại danh sách công việc”; “Xem công việc”; “Đã bắt đầu công việc”; “Đang thực hiện” | Actions/status | Yes. |
| “Incident Context”; “Read-only orchestration context”; “Resident reports supporting this task”; “Operational evidence” | technician-workflow.tsx / read-only incident/report context | Technician | “Thông tin sự cố”; “Thông tin chỉ xem”; “Các phản ánh liên quan đến công việc này”; “Thông tin phục vụ xử lý” | Context | Yes; avoid jargon. |
| “Official location”; “Correlated affected area”; “Priority”; “SLA state”; “Priority, assigned team, and incident scope are read-only. BQL remains responsible for routing and final incident closure.” | technician-workflow.tsx / task context | Technician | “Vị trí ghi nhận”; “Phạm vi ảnh hưởng suy ra”; “Mức độ ưu tiên”; “Trạng thái SLA”; “Mức ưu tiên, đội được phân công và phạm vi sự cố chỉ để xem. BQL phụ trách điều phối và đóng sự cố.” | Context / boundary | Yes; keep scope and ownership clear. |
| “Initial Inspection”; “Confirm active leak”; “Identify visible source”; “Check affected area”; “Assess immediate property damage”; “Check nearby units / common area” | technician-workflow.tsx / checklist | Technician | “Kiểm tra ban đầu”; “Xác nhận rò rỉ còn tiếp diễn”; “Xác định vị trí rò rỉ nhìn thấy được”; “Kiểm tra khu vực bị ảnh hưởng”; “Đánh giá hư hại tài sản trước mắt”; “Kiểm tra căn hộ lân cận / khu vực chung” | Checklist | Yes. |
| “Safety note”; “If active water reaches electrical equipment, stop work and escalate immediately. Do not perform unsafe intervention.”; “Static safety reminder · No automated safety decision” | technician-workflow.tsx / safety card | Technician | “Lưu ý an toàn”; “Nếu nước đang tiếp xúc với thiết bị điện, hãy dừng công việc và báo cấp quản lý ngay. Không tiếp tục thao tác nếu không an toàn.”; “Lưu ý an toàn tĩnh; hệ thống không tự đưa ra quyết định an toàn.” | Safety | Yes; preserve urgent instruction and non-automation note. |
| “Information Provenance”; “Likely issue”; “System record”; “AI-generated”; “Human decision” | technician-workflow.tsx / source summary | Technician | “Nguồn thông tin”; “Vấn đề có thể gặp”; “Ghi nhận của hệ thống”; “AI nhận định”; “BQL quyết định” | Provenance | Yes. |
| “Record resolution”; “Resolution status”; “What was done?”; “Cause / finding (optional)”; “Affected area confirmed”; “Reason” | technician-workflow.tsx / result form | Technician | “Ghi nhận kết quả xử lý”; “Trạng thái xử lý”; “Bạn đã làm gì?”; “Nguyên nhân / phát hiện (không bắt buộc)”; “Đã xác nhận phạm vi ảnh hưởng”; “Lý do” | Form | Yes; execution-oriented. |
| “Describe the action taken and the observed result.”; “Visible leak identified near service riser.”; “Needs further inspection”; “Select a reason” | technician-workflow.tsx / form prompts/options | Technician | “Mô tả thao tác đã thực hiện và kết quả quan sát được”; “Phát hiện rò rỉ gần trục kỹ thuật”; “Cần kiểm tra thêm”; “Chọn lý do” | Form guidance | Yes. |
| “Requires specialist”; “Access unavailable”; “Source not identified”; “Safety concern”; “Requires BQL review”; “Other” | technician-workflow.tsx / escalation reasons | Technician | “Cần chuyên môn khác”; “Không thể tiếp cận”; “Chưa xác định được nguồn”; “Có nguy cơ mất an toàn”; “Cần BQL xem xét”; “Khác” | Escalation | Yes. |
| “Select a reason before submitting for review.”; “Add a resolution note before marking the task resolved.”; “Submit for review”; “Mark resolved”; “Cancel” | technician-workflow.tsx / validation and submit | Technician | “Chọn lý do trước khi gửi BQL xem xét”; “Thêm ghi chú xử lý trước khi đánh dấu công việc hoàn tất”; “Gửi BQL xem xét”; “Đánh dấu đã ghi nhận hoàn tất”; “Hủy” | Validation/action | Yes; task completion must not imply incident closure. |
| “Task resolved”; “Task requires follow-up”; “Resolution recorded by the technician.”; “Submitted for BQL review. No reassignment was created.” | technician-workflow.tsx / result state | Technician | “Đã ghi nhận hoàn tất công việc”; “Công việc cần xử lý tiếp”; “Nhân viên kỹ thuật đã ghi nhận kết quả”; “Đã gửi BQL xem xét. Chưa tạo phân công mới.” | Task status | Yes. |
| “Resolving this task does not close the incident. BQL remains responsible for final operational review and closure.”; “Return to task queue”; “View incident” | technician-workflow.tsx / post-resolution boundary and navigation | Technician | “Hoàn tất công việc này không đóng sự cố. BQL vẫn chịu trách nhiệm xem xét cuối cùng và đóng sự cố.”; “Quay lại danh sách công việc”; “Xem sự cố” | Boundary/navigation | Yes; retain explicit boundary. |
| “Resolved by”; “Resolution”; “Resolution note”; “Finding”; “Affected area”; “Review reason”; “Timestamp”; “Not provided” | technician-workflow.tsx / result record | Technician | “Người ghi nhận”; “Kết quả xử lý”; “Ghi chú xử lý”; “Phát hiện”; “Khu vực ảnh hưởng”; “Lý do cần xem xét”; “Thời điểm”; “Chưa cung cấp” | Record labels | Yes. |
| “Prototype state”; “Just now · prototype state”; “Started today · prototype state”; “Mock operational clock” | data.ts, state providers and technician view | Technician / prototype users | “Trạng thái bản mẫu”; “Vừa xong · trạng thái bản mẫu”; “Bắt đầu hôm nay · trạng thái bản mẫu”; “Đồng hồ vận hành mô phỏng” | Prototype/debug | Yes; consistently mark simulated values. |

### Resident

| Current English text | File / context | Audience | Recommended Vietnamese | Category | Standardize? |
|---|---|---|---|---|---|
| “Report an issue”; “Tell us what happened in your own words. You do not need to choose a category or priority.” | resident-workflow.tsx / report form | Resident | “Gửi phản ánh”; “Hãy mô tả điều bạn nhận thấy. Bạn không cần chọn danh mục hay mức độ ưu tiên.” | Report form | Yes; simple, reassuring wording. |
| “Describe what you noticed and when it started.”; “e.g. Tower A · Unit A-1204”; “Additional details (optional)”; “Anything else the building team should know?” | resident-workflow.tsx / form prompts | Resident | “Mô tả điều bạn nhận thấy và thời điểm bắt đầu”; “Ví dụ: Tháp A · Căn hộ A-1204”; “Thông tin bổ sung (không bắt buộc)”; “Bạn có muốn cho Ban Quản lý biết thêm điều gì không?” | Form guidance | Yes. |
| “Photo (optional)”; “Add a photo”; “PNG or JPG up to 10 MB” | resident-workflow.tsx / upload | Resident | “Ảnh (không bắt buộc)”; “Thêm ảnh”; “Tệp PNG hoặc JPG, tối đa 10 MB” | Upload | Yes. |
| “One quick step”; “We need a little more information”; “Your answers help the building team understand what to review first.”; “Is water currently dripping?”; “Yes, actively dripping”; “No, only visible water marks”; “Not sure”; “Where is the water appearing?” | resident-workflow.tsx / clarification prompt | Resident | “Thêm một thông tin”; “Chúng tôi cần thêm một chút thông tin”; “Câu trả lời giúp Ban Quản lý xác định việc cần xem xét trước”; “Hiện nước có đang nhỏ giọt không?”; “Có, đang nhỏ giọt”; “Không, chỉ thấy vết nước”; “Tôi không chắc”; “Bạn thấy nước ở đâu?” | Clarification | Yes; avoid technical language. |
| “Thanks — we’ve received your report”; “Here is what we understood. The building management team will review it.”; “Thanks. Your report has been updated.”; “Your report has been updated and is under review.” | resident-workflow.tsx / submission confirmations | Resident | “Cảm ơn bạn — chúng tôi đã nhận phản ánh”; “Đây là nội dung chúng tôi ghi nhận. Ban Quản lý sẽ xem xét”; “Cảm ơn bạn. Phản ánh đã được cập nhật”; “Phản ánh đã được cập nhật và đang được xem xét” | Confirmation | Yes. |
| “Resident-provided information”; “We understood your report as”; “Active water leak”; “Possible issue type”; “Under review” | resident-workflow.tsx / submission preview | Resident | “Thông tin bạn cung cấp”; “Chúng tôi ghi nhận phản ánh của bạn là”; “Rò rỉ nước đang diễn ra”; “Loại sự cố có thể gặp”; “Đang được xem xét” | Preview / AI understanding | Yes; indicate that classification is tentative. |
| “Related building issue”; “This issue is being coordinated with other reports in your building.” | resident-workflow.tsx, resident-state.tsx / related event message | Resident | “Sự cố tương tự trong tòa nhà”; “Ban Quản lý đang phối hợp xử lý phản ánh này cùng một số phản ánh khác trong tòa nhà.” | Related reports / privacy | Yes; do not reveal other residents’ report details. |
| “What happens next”; “More information needed”; “Follow-up required”; “Resolution is being reviewed”; “Resolution”; “Progress updates”; “Your report” | resident-workflow.tsx / status page sections | Resident | “Tiếp theo sẽ ra sao”; “Cần thêm thông tin”; “Cần xử lý thêm”; “Đang xem xét kết quả xử lý”; “Kết quả xử lý”; “Cập nhật tiến độ”; “Phản ánh của bạn” | Resident status | Yes. |
| “Was your issue resolved?”; “Yes, resolved”; “Still happening” | resident-workflow.tsx / resident feedback | Resident | “Vấn đề đã được xử lý chưa?”; “Đã xử lý xong”; “Vẫn còn” | Feedback | Yes; retain distinct internal feedback values. |
| “Description”; “Location”; “Additional details”; “Photo attached”; “No photo attached”; “Clarification” | resident-workflow.tsx / report details | Resident | “Mô tả”; “Vị trí”; “Thông tin bổ sung”; “Đã đính kèm ảnh”; “Chưa đính kèm ảnh”; “Thông tin làm rõ” | Report summary | Yes. |
| “Report received”; “Your report is being reviewed”; “A maintenance team has been assigned”; “Maintenance team is working on it”; “Maintenance work is currently in progress.” | resident-workflow.tsx, resident-state.tsx / timeline and status copy | Resident | “Đã nhận phản ánh”; “Phản ánh của bạn đang được xem xét”; “Đã sắp xếp nhân viên kỹ thuật”; “Nhân viên kỹ thuật đang xử lý”; “Công việc bảo trì đang được thực hiện” | Progress | Yes. |
| “Maintenance work has been completed.”; “The building management team is reviewing the result before closing the issue.”; “Issue marked as resolved”; “The building management team has completed its final review.” | resident-workflow.tsx / completion stages | Resident | “Nhân viên kỹ thuật đã hoàn tất công việc”; “Ban Quản lý đang xem xét kết quả trước khi đóng sự cố”; “Sự cố đã được đánh dấu là đã xử lý”; “Ban Quản lý đã hoàn tất bước xem xét cuối cùng” | Resolution / closure | Yes; do not report final resolution before BQL review. |
| “Additional work is needed to resolve this issue.”; “Building management is reviewing the next step. No specific time is promised yet.” | resident-workflow.tsx / follow-up status | Resident | “Cần thực hiện thêm công việc để xử lý vấn đề này”; “Ban Quản lý đang xem xét bước tiếp theo. Hiện chưa có thời gian cụ thể.” | Follow-up | Yes; preserve honest timing. |
| “Answer the question below and your report will return to review.”; “The issue needs another safety review before work can continue.”; “Please avoid the affected area if it appears unsafe.” | resident-workflow.tsx / information and safety statuses | Resident | “Hãy trả lời câu hỏi bên dưới để chúng tôi tiếp tục xem xét phản ánh”; “Cần kiểm tra an toàn thêm trước khi tiếp tục công việc”; “Vui lòng tránh khu vực bị ảnh hưởng nếu bạn thấy nơi đó không an toàn” | Guidance / safety | Yes. |
| “Prototype / Demo control”; “Preview resident-safe states without exposing internal workflow controls.” | resident-workflow.tsx / collapsible demo control | Resident / prototype operator | “Điều khiển bản mẫu”; “Xem trước các trạng thái dành cho cư dân” | Prototype/debug | Yes; keep visibly demo-only or remove from the resident presentation flow in a later product decision. |

### Mock and demo data

| Current English text | File / context | Audience | Recommended Vietnamese | Category | Standardize? |
|---|---|---|---|---|---|
| “Water is leaking from the kitchen ceiling”; “Water is dripping into the hallway”; “Ceiling is wet with active dripping”; “Water marks spreading across the bedroom ceiling”; “Active dripping near the service riser”; “Water visible outside the utility closet” | data.ts / seeded resident reports | BQL, Technician; resident sees the hero report | “Nước rò từ trần bếp”; “Nước nhỏ xuống hành lang”; “Trần đang ướt và có nước nhỏ giọt”; “Vết nước lan rộng trên trần phòng ngủ”; “Nước đang nhỏ gần trục kỹ thuật”; “Thấy nước bên ngoài phòng kỹ thuật” | Mock report copy | Yes; keep factual, concise, and consistent. |
| “Elevator doors not opening”; “Power outlet sparking” | data.ts / seeded resident reports | BQL, Technician | “Cửa thang máy không mở”; “Ổ cắm điện phát tia lửa” | Mock report copy / safety | Yes; preserve safety urgency. |
| “Water leak affecting multiple units”; “Elevator Failure”; “Electrical Issue”; “HVAC Temperature Alert” | data.ts, pages.tsx / incident titles | BQL / Technician | “Rò rỉ nước ảnh hưởng nhiều căn hộ”; “Sự cố thang máy”; “Sự cố điện”; “Cảnh báo nhiệt độ hệ thống điều hòa” | Mock incident title | Yes; standardize capitalization and category terms. |
| “Investigate active water leak”; “Inspect corridor electrical circuit”; “Test and recalibrate door sensor” | data.ts / task titles | Technician | “Kiểm tra tình trạng rò rỉ nước”; “Kiểm tra mạch điện hành lang”; “Kiểm tra và hiệu chỉnh lại cảm biến cửa” | Mock task copy | Yes; use action verbs. |
| “Plumbing”; “Electrical”; “Vertical Transport”; “Technical — Plumbing”; “Technical — Electrical”; “Technical — HVAC”; “Technical — General Maintenance” | data.ts, routing options and team facts | BQL / Technician | “Cấp thoát nước”; “Điện”; “Thang máy”; “Đội kỹ thuật – Cấp thoát nước”; “Đội kỹ thuật – Điện”; “Đội kỹ thuật – Điều hòa thông gió”; “Đội kỹ thuật – Bảo trì tổng hợp” | Team/category names | Yes; settle a specialty-team glossary. |
| “Building Engineering”; “Available”; “Status allows assignment”; “Property coverage”; “Incident location”; “Required skill”; “Team capability”; “Workflow eligibility” | routing-workflow.tsx / system check examples | BQL | “Kỹ thuật tòa nhà”; “Có sẵn”; “Trạng thái cho phép phân công”; “Phạm vi phục vụ”; “Vị trí sự cố”; “Kỹ năng cần có”; “Năng lực của đội”; “Điều kiện quy trình” | Verification | Yes; distinguish values from check labels. |
| “Tower A / Floor 12”; “Tower A / Floors 12–14”; “Tower B / Main elevator”; “Tower C / Floor 6”; “Tower A · Unit A-1204” | data.ts, pages.tsx, workflow mock data | All, depending on screen | “Tháp A / Tầng 12”; “Tháp A / Tầng 12–14”; “Tháp B / Thang máy chính”; “Tháp C / Tầng 6”; “Tháp A · Căn hộ A-1204” | Location | Yes; retain unit/tower identifiers, translate the generic words. |
| “1h 42m left”; “28m left”; “3h 15m left”; “5h 08m left”; “1h 42m remaining”; “12m over target”; “On track · 3h 15m”; “At risk · 1h 42m” | data.ts, pages.tsx, technician-workflow.tsx / sample SLA values | BQL / Technician | “Còn 1 giờ 42 phút”; “Còn 28 phút”; “Còn 3 giờ 15 phút”; “Còn 5 giờ 08 phút”; “Còn 1 giờ 42 phút”; “Trễ 12 phút”; “Đang trong hạn · còn 3 giờ 15 phút”; “Có nguy cơ trễ · còn 1 giờ 42 phút” | Mock SLA | Yes; standardize duration formatting. |
| “14:03”; “1 hr ago”; “2 hrs ago”; “8 min ago”; “24 min ago”; “Just now”; “Earlier today · prototype state” | data.ts, timeline and dashboard copy | All, depending on screen | Keep clock format; “1 giờ trước”; “2 giờ trước”; “8 phút trước”; “24 phút trước”; “Vừa xong”; “Hôm nay · trạng thái bản mẫu” | Time / prototype | Yes; preserve time values, translate relative units. |
| “Resident reported the issue is still happening”; “Building management review requested”; “Water leakage was addressed by the maintenance team.” | resident-state.tsx / sample timeline and resolution summary | Resident | “Cư dân cho biết sự cố vẫn còn”; “Đã chuyển Ban Quản lý xem xét”; “Đội kỹ thuật đã xử lý tình trạng rò rỉ nước.” | Mock timeline / resolution | Yes; avoid exposing another resident’s identity or details. |

## 8. Inconsistencies / Risks

1. **Ticket/report/incident boundaries:** Ticket is one resident report, while Incident is an operational record coordinating several reports. Current headers and metrics sometimes substitute one for another. A translation pass must preserve the distinction.
2. **Issue/incident ambiguity:** “Issue” appears in resident prompts, issue categories, and resolution copy; “incident” is also used for the BQL record. Use resident-friendly “vấn đề/phản ánh” for what the resident observes and “sự cố” for the operational record.
3. **Routing/assignment/dispatch:** Copy generally handles the boundary correctly, but terms can sound like a team has already been assigned. State explicitly that AI recommends, system checks eligibility, and BQL approval creates the assignment.
4. **Resolved vs closed:** The same internal Resolved value appears at task, resolution, and incident layers. The technician result card and adjacent warning already clarify that task completion does not close an incident; later labels must preserve that distinction.
5. **Correlation certainty:** “High correlation confidence” may be read as proof. The source correctly says correlation does not establish a shared root cause. Keep this caveat close to the score and never show the score to residents.
6. **System verification scope:** “System-verified Facts” is broader than some records warrant because the incident also includes resident-provided and AI-derived information. Prefer “Thông tin hệ thống đã kiểm tra” and label each source.
7. **Team taxonomy:** “Maintenance team,” “Technical — Plumbing,” “Vertical Transport,” “Electrical,” “HVAC,” and “General Maintenance” are not a consistent team naming scheme. Standardize team labels without changing team values or data keys in Phase 0.
8. **Audience leakage:** The normal resident page is resident-focused, but it includes a collapsible “Prototype / Demo control” with a status selector. The demo control is explicitly labeled but remains visible and interactive. It should not be mistaken for a real resident control.
9. **Debug/demo claims:** “Mock operational clock,” “prototype state,” “Prototype access only. No real authentication is performed,” and demo role selection are truthful prototype disclosures. Translate them clearly if retained; do not present simulated timestamps or authentication as live production behavior.
10. **Internal context vocabulary:** Technician-facing “orchestration,” “provenance,” “correlation-derived,” and “operational evidence” are accurate for internal review but less useful than concrete instructions. Prefer task-oriented Vietnamese in that role.
11. **Safety:** The resident safety state and technician instruction are high-impact copy. Keep them direct and action-oriented; do not soften “stop work,” “escalate immediately,” or “avoid the affected area if unsafe.”
12. **Official vs inferred location:** Preserve the difference between official recorded location and correlated affected area. The latter may be inferred and should not be rendered as a verified address or confirmed scope.

## 9. Protected Technical Terms

The Vietnamese refactor should affect presentation labels and copy only. Keep the following names and values unchanged in code, data contracts, route declarations, state comparisons, and tests/fixtures:

- **TypeScript types and interfaces:** Priority, Status, Ticket, Incident, TaskStatus, ResolutionStatus, AffectedAreaConfirmation, TechnicianTask, ResidentStatus, ResidentTimelineEvent, ResidentTicketView, Role, DashboardIncident, SlaState, HeroIncidentStatus, HeroResolutionRecord, OperationalState, OperationalStateContextValue, SubmitReportInput, ResidentStateContextValue, ResolutionInput, TechnicianTaskContextValue, RoutingDecisionStatus, RoutingDecision, RoutingDecisionContextValue, CorrelationStatus, CorrelationStrength, Decision, ReportStage, and ButtonProps.
- **Internal state values and literals:** Open, Pending Approval, Assigned, In Progress, Resolution Review, Under Review, Resolved, Needs Follow-up, Unable to resolve, Requires follow-up, Yes, No, Needs further inspection, all nine ResidentStatus values, routing values Approved / Changed / Sent Back, BQL review values Pending / Reviewed / Closed, correlation values Linked / Candidate / Excluded, priority values, SLA values, and workflow-only values such as form, clarification, preview, idle, composing, sent, confirmed, and rejected.
- **Route paths and parameters:** /, /login, /bql, /bql/dashboard, /bql/tickets, /bql/incidents, /bql/incidents/:id, /bql/incidents/:id/correlation, /bql/incidents/:id/routing, /bql/incidents/:id/approval, /technician, /technician/tasks, /technician/tasks/:id, /resident, /resident/report, /resident/tickets/:id, and *; preserve parameter names such as id.
- **Identifiers and DOM/form keys:** ticket, incident, and task IDs such as TKT-1024, INC-024, TASK-102; DOM IDs such as attention-summary, priority-task, other-tasks, reject-correlation-title, and clarification-title; radio/input names such as routing-team, dripping, and water-location.
- **Role keys and data keys:** role keys bql, technician, resident; property names such as officialLocation, correlatedAffectedArea, tickets, currentTeam, recommendedTeam, assignmentSource, residentStatus, resolutionStatus, bqlReviewStatus, and routingStatus.
- **Components, providers, functions, and hooks:** preserve exported component/function names, provider names, and hooks, including AppShell, EntryPage, LoginPage, DashboardPage, IncidentDetailPage, CorrelationReviewPage, RoutingPage, ApprovalPage, TasksPage, TaskDetailPage, ReportPage, ResidentTicketPage, OperationalStateProvider, ResidentStateProvider, TechnicianTaskProvider, RoutingDecisionProvider, useOperationalState, useResidentState, useTechnicianTasks, and useRoutingDecisions.
- **Proper names, product name, and record IDs:** FixIt Agent, Sunrise Residence, sample personal names, and alphanumeric building/unit identifiers should stay unchanged unless a later content decision explicitly localizes a proper name.
- **Provider/package/URL tokens:** React/router/provider/package names, import paths, external provider names if added later, query parameter keys, MIME types, and data keys are technical tokens, not translatable UI copy.

The mapping from an internal state to a Vietnamese label should be applied only when rendering the state. Do not replace an internal literal with Vietnamese, rename its type, or use the Vietnamese label as the stored value.

## 10. Recommended Refactor Order

1. **Phase 1 — Shared UI Language Layer:** Establish a small presentation-only label map for common role names, navigation, priority, SLA, provenance, and status labels. Keep it local to the prototype; do not add i18n infrastructure. Add context-specific labels for the overloaded “Resolved” value.
2. **Phase 2 — BQL Console:** Translate the dashboard, tickets, incident list/detail, correlation review, routing recommendation, approval, and final review. Keep AI, system, BQL, and technician boundaries visible.
3. **Phase 3 — Technician Workspace:** Translate task queue, read-only incident context, checklist, safety guidance, resolution form, validation, and submitted result. Keep the “task resolved ≠ incident closed” distinction explicit.
4. **Phase 4 — Resident Experience:** Translate reporting, clarification, confirmations, resident timeline, status explanations, and feedback using simpler vocabulary. Decide whether the prototype control remains available for demos; do not expose it as an ordinary resident feature.
5. **Phase 5 — Final Language QA:** Review every role and state transition in the running prototype for untranslated copy, consistent terminology, Vietnamese diacritics, clarity of actor/next step, and status consistency. Verify that identifiers and stored state values remain English and unchanged.

## 11. Phase 0 Acceptance Criteria

| Criterion | Phase 0 result |
|---|---|
| All major user-facing English areas have been identified. | Complete: shared shell, entry/login, BQL, technician, resident, seeded data, errors, and demo/debug copy are inventoried. |
| Core domain terminology has been audited. | Complete: Section 3 defines canonical Vietnamese terms and records current inconsistencies. |
| Status mappings have been defined. | Complete: Section 4 maps lifecycle, routing, review, correlation, priority, and SLA labels by audience/context. |
| AI/System/Human terminology has been audited. | Complete: Section 5 records current wording, recommended Vietnamese, and boundary rules. |
| Role-specific language has been identified. | Complete: Section 6 separates BQL, technician, and resident language and leakage risks. |
| Technical identifiers that must remain unchanged are documented. | Complete: Section 9 lists types, state values, paths, IDs, data keys, and code symbols. |
| No UI behavior has been changed. | Complete: no application source was changed. |
| No routes have changed. | Complete: no application source was changed. |
| No state machine values have changed. | Complete: all values are recorded as protected. |
| No new i18n framework has been introduced. | Complete: only this audit document was added. |

## 12. Do not over-engineer

This is a prototype. Do not introduce i18next, react-intl, next-intl, language switching, locale infrastructure, backend localization, or translation APIs. Implement a Vietnamese-first presentation layer with direct copy and small local mappings where needed. Keep the application state machine, route structure, and data contracts stable.
