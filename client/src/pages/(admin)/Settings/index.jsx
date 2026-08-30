import { useState } from 'react';
import { Bot, Mail, MessageSquare, RotateCcw, Save, Settings2 } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const initialSettings = {
  systemName: 'ChatBot P-Advisor', supportEmail: 'tuyensinh@ptit.edu.vn', supportPhone: '024 3756 2186', timezone: 'Asia/Ho_Chi_Minh',
  welcomeMessage: 'Xin chào! Tôi có thể hỗ trợ bạn tìm hiểu thông tin tuyển sinh PTIT.', fallbackMessage: 'Tôi chưa có đủ thông tin để trả lời. Bạn có muốn gửi yêu cầu tới tư vấn viên không?', model: 'gpt-4o-mini', temperature: '0.3', maxResponseTokens: '800', showSources: true,
  guestQuestionLimit: '2', guestSessionHours: '24', advisorTimeoutMinutes: '15', allowStaffTransfer: true, autoCloseResolved: false,
  smtpHost: 'smtp.gmail.com', smtpPort: '587', smtpUsername: 'thaithanhquan11102005@gmail.com', smtpPassword: '', smtpTls: true, senderName: 'PTIT Admission Advisor',
};

const tabs = [
  ['general', 'Cấu hình chung', Settings2],
  ['chatbot', 'Chatbot & AI', Bot],
  ['conversation', 'Phiên tư vấn', MessageSquare],
  ['email', 'Email SMTP', Mail],
];

function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [notice, setNotice] = useState('');
  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);
  const set = (field) => (event) => setSettings((current) => ({ ...current, [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));
  const save = () => { setSavedSettings(settings); setNotice('Đã lưu cấu hình trên giao diện.'); setTimeout(() => setNotice(''), 2500); };
  const reset = () => setSettings(savedSettings);

  return (
    <div className='mx-auto max-w-[1400px]'>
      <div className='mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div><AdminBreadcrumb pageTitle='Cấu hình hệ thống' /><h1 className='text-[26px] font-bold tracking-tight text-slate-900'>Cấu hình hệ thống</h1><p className='mt-1 text-[13px] text-slate-500'>Quản lý các thiết lập vận hành của chatbot và hệ thống tư vấn tuyển sinh.</p></div>
        <div className='flex items-center gap-2'><Button variant='outline' onClick={reset} disabled={!isDirty}><RotateCcw size={15} />Khôi phục</Button><Button onClick={save} disabled={!isDirty}><Save size={15} />Lưu thay đổi</Button></div>
      </div>

      {notice && <div className='mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700'>{notice}</div>}
      <div className='grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]'>
        <nav className='h-fit rounded-lg border border-slate-200 bg-white p-2'>
          {tabs.map(([id, label, Icon]) => <button key={id} type='button' onClick={() => setActiveTab(id)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs font-medium transition ${activeTab === id ? 'bg-red-50 text-[#D71920]' : 'text-slate-600 hover:bg-slate-50'}`}><Icon size={16} />{label}</button>)}
        </nav>

        <main className='rounded-lg border border-slate-200 bg-white'>
          {activeTab === 'general' && <SettingsSection title='Cấu hình chung' description='Thông tin nhận diện và kênh hỗ trợ được sử dụng trong hệ thống.'><FormGrid><Field label='Tên hệ thống' required><Input value={settings.systemName} onChange={set('systemName')} /></Field><Field label='Múi giờ'><Select value={settings.timezone} onChange={set('timezone')}><option value='Asia/Ho_Chi_Minh'>Việt Nam (GMT+7)</option><option value='UTC'>UTC</option></Select></Field><Field label='Email hỗ trợ'><Input type='email' value={settings.supportEmail} onChange={set('supportEmail')} /></Field><Field label='Số điện thoại hỗ trợ'><Input value={settings.supportPhone} onChange={set('supportPhone')} /></Field></FormGrid></SettingsSection>}

          {activeTab === 'chatbot' && <SettingsSection title='Chatbot & AI' description='Thiết lập cách chatbot phản hồi và xử lý trường hợp không tìm thấy thông tin.'><div className='space-y-5'><Field label='Lời chào'><Textarea value={settings.welcomeMessage} onChange={set('welcomeMessage')} /></Field><Field label='Phản hồi khi không có dữ liệu'><Textarea value={settings.fallbackMessage} onChange={set('fallbackMessage')} /></Field><FormGrid><Field label='Mô hình'><Select value={settings.model} onChange={set('model')}><option value='gpt-4o-mini'>GPT-4o mini</option><option value='gpt-4o'>GPT-4o</option></Select></Field><Field label='Temperature' hint='Giá trị thấp giúp câu trả lời ổn định hơn.'><Input type='number' min='0' max='1' step='0.1' value={settings.temperature} onChange={set('temperature')} /></Field><Field label='Số token phản hồi tối đa'><Input type='number' min='100' value={settings.maxResponseTokens} onChange={set('maxResponseTokens')} /></Field></FormGrid><Toggle label='Hiển thị nguồn tham khảo' description='Đính kèm tên tài liệu được sử dụng trong câu trả lời.' checked={settings.showSources} onChange={set('showSources')} /></div></SettingsSection>}

          {activeTab === 'conversation' && <SettingsSection title='Phiên chat và tư vấn viên' description='Giới hạn sử dụng và quy tắc chuyển tiếp giữa chatbot với tư vấn viên.'><FormGrid><Field label='Số câu hỏi tối đa của khách'><Input type='number' min='1' value={settings.guestQuestionLimit} onChange={set('guestQuestionLimit')} /></Field><Field label='Thời gian lưu phiên khách (giờ)'><Input type='number' min='1' value={settings.guestSessionHours} onChange={set('guestSessionHours')} /></Field><Field label='Thời gian chờ tư vấn viên (phút)'><Input type='number' min='1' value={settings.advisorTimeoutMinutes} onChange={set('advisorTimeoutMinutes')} /></Field></FormGrid><div className='mt-6 divide-y divide-slate-100 border-y border-slate-100'><Toggle label='Cho phép chuyển tư vấn viên' description='Tư vấn viên có thể chuyển phiên đang xử lý cho người khác.' checked={settings.allowStaffTransfer} onChange={set('allowStaffTransfer')} /><Toggle label='Tự động đóng yêu cầu đã hoàn thành' description='Ẩn yêu cầu khỏi danh sách đang xử lý sau khi chuyển sang RESOLVED.' checked={settings.autoCloseResolved} onChange={set('autoCloseResolved')} /></div></SettingsSection>}

          {activeTab === 'email' && <SettingsSection title='Email SMTP' description='Máy chủ dùng để gửi email xác thực, đặt lại mật khẩu và thông báo tư vấn.'><FormGrid><Field label='SMTP host' required><Input value={settings.smtpHost} onChange={set('smtpHost')} /></Field><Field label='SMTP port' required><Input type='number' value={settings.smtpPort} onChange={set('smtpPort')} /></Field><Field label='Tài khoản SMTP' required><Input value={settings.smtpUsername} onChange={set('smtpUsername')} /></Field><Field label='Mật khẩu ứng dụng'><Input type='password' value={settings.smtpPassword} onChange={set('smtpPassword')} placeholder='Không thay đổi nếu để trống' /></Field><Field label='Tên người gửi'><Input value={settings.senderName} onChange={set('senderName')} /></Field></FormGrid><div className='mt-6 border-y border-slate-100'><Toggle label='Bật STARTTLS' description='Mã hóa kết nối tới máy chủ SMTP.' checked={settings.smtpTls} onChange={set('smtpTls')} /></div><div className='mt-5 flex justify-end'><Button variant='outline'>Gửi email kiểm tra</Button></div></SettingsSection>}
        </main>
      </div>
      {isDirty && <p className='mt-3 text-right text-[11px] text-orange-600'>Bạn có thay đổi chưa được lưu.</p>}
    </div>
  );
}

function SettingsSection({ title, description, children }) { return <section><header className='border-b border-slate-200 px-6 py-5'><h2 className='text-base font-bold text-slate-900'>{title}</h2><p className='mt-1 text-xs text-slate-500'>{description}</p></header><div className='p-6'>{children}</div></section>; }
function FormGrid({ children }) { return <div className='grid gap-5 md:grid-cols-2'>{children}</div>; }
function Field({ label, hint, required, children }) { return <label className='block'><span className='mb-2 block text-xs font-semibold text-slate-700'>{label}{required && <span className='ml-1 text-[#D71920]'>*</span>}</span>{children}{hint && <span className='mt-1.5 block text-[10px] text-slate-400'>{hint}</span>}</label>; }
function Textarea(props) { return <textarea rows='3' className='w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-xs leading-5 text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50' {...props} />; }
function Toggle({ label, description, checked, onChange }) { return <label className='flex cursor-pointer items-center justify-between gap-4 py-4'><span><span className='block text-xs font-semibold text-slate-700'>{label}</span><span className='mt-1 block text-[11px] text-slate-500'>{description}</span></span><span className='relative shrink-0'><input type='checkbox' checked={checked} onChange={onChange} className='peer sr-only' /><span className='block h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-[#D71920]' /><span className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5' /></span></label>; }

export default Settings;
