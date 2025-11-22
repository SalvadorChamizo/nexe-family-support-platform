// Configuración
const API_BASE = '/api';

// Estado
let allShifts = [];
let filteredShifts = [];
let editingShiftId = null;
let currentView = 'grid';

// Elementos DOM
const shiftForm = document.getElementById('shift-form');
const shiftsContainer = document.getElementById('shifts-container');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const formModal = document.getElementById('form-modal');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const totalShiftsEl = document.getElementById('total-shifts');
const totalHoursEl = document.getElementById('total-hours');
const shiftsCountEl = document.getElementById('shifts-count');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadShifts();
    setupFormHandlers();
    setTodayAsDefault();
});

// Setup
function setupFormHandlers() {
    shiftForm.addEventListener('submit', handleSubmit);
}

function setTodayAsDefault() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Cargar turnos
async function loadShifts() {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE}/shifts`);
        const data = await response.json();
        
        if (!data.success) throw new Error(data.error);
        
        allShifts = data.data;
        filteredShifts = allShifts;
        displayShifts(filteredShifts);
        updateStats();
        
    } catch (error) {
        showNotification('Error al cargar turnos: ' + error.message, 'error');
        hideLoading();
    }
}

// Mostrar turnos
function displayShifts(shifts) {
    hideLoading();
    
    shiftsCountEl.textContent = shifts.length;
    
    if (shifts.length === 0) {
        emptyState.classList.remove('hidden');
        shiftsContainer.innerHTML = '';
        return;
    }
    
    emptyState.classList.add('hidden');
    shiftsContainer.className = currentView === 'grid' ? 'shifts-grid' : 'shifts-list';
    
    shiftsContainer.innerHTML = shifts.map(shift => `
        <div class="shift-card">
            <div class="shift-header">
                <div>
                    <div class="shift-user">${escapeHtml(shift.user_name)}</div>
                    <span class="shift-role">${getRoleIcon(shift.role)} ${escapeHtml(shift.role)}</span>
                </div>
                <div class="shift-actions">
                    <button class="btn-edit" onclick="editShift(${shift.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="deleteShift(${shift.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
            
            <div class="shift-details">
                <div class="shift-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(shift.date)}</span>
                </div>
                <div class="shift-detail">
                    <i class="fas fa-clock"></i>
                    <span>${shift.start_time} - ${shift.end_time}</span>
                </div>
                <div class="shift-detail">
                    <i class="fas fa-hourglass-half"></i>
                    <span>${shift.hours} horas</span>
                </div>
                <div class="shift-detail">
                    <i class="fas fa-id-card"></i>
                    <span>${escapeHtml(shift.user_id)}</span>
                </div>
            </div>
            
            ${shift.notes ? `
                <div class="shift-notes">
                    <i class="fas fa-comment"></i> ${escapeHtml(shift.notes)}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Formulario
async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        user_id: document.getElementById('user_id').value,
        user_name: document.getElementById('user_name').value,
        date: document.getElementById('date').value,
        start_time: document.getElementById('start_time').value,
        end_time: document.getElementById('end_time').value,
        hours: parseInt(document.getElementById('hours').value),
        role: document.getElementById('role').value,
        notes: document.getElementById('notes').value || ''
    };
    
    try {
        const isEditing = editingShiftId !== null;
        const url = isEditing ? `${API_BASE}/shifts/${editingShiftId}` : `${API_BASE}/shifts`;
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        
        showNotification(
            isEditing ? '✅ Turno actualizado correctamente' : '✅ Turno creado correctamente',
            'success'
        );
        
        hideCreateForm();
        resetForm();
        loadShifts();
        
    } catch (error) {
        showNotification('❌ Error: ' + error.message, 'error');
    }
}

// Modal
function showCreateForm() {
    resetForm();
    formModal.classList.remove('hidden');
    formTitle.innerHTML = '<i class="fas fa-calendar-plus"></i> Crear Nuevo Turno';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Turno';
}

function hideCreateForm() {
    formModal.classList.add('hidden');
    resetForm();
}

function resetForm() {
    shiftForm.reset();
    editingShiftId = null;
    setTodayAsDefault();
}

// Editar
async function editShift(id) {
    try {
        const response = await fetch(`${API_BASE}/shifts/${id}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        
        const shift = data.data;
        
        document.getElementById('user_id').value = shift.user_id;
        document.getElementById('user_name').value = shift.user_name;
        document.getElementById('date').value = shift.date;
        document.getElementById('start_time').value = shift.start_time;
        document.getElementById('end_time').value = shift.end_time;
        document.getElementById('hours').value = shift.hours;
        document.getElementById('role').value = shift.role;
        document.getElementById('notes').value = shift.notes;
        
        editingShiftId = id;
        formModal.classList.remove('hidden');
        formTitle.innerHTML = '<i class="fas fa-edit"></i> Editar Turno';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Turno';
        
    } catch (error) {
        showNotification('❌ Error al cargar turno: ' + error.message, 'error');
    }
}

// Eliminar
async function deleteShift(id) {
    if (!confirm('¿Estás seguro de eliminar este turno?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/shifts/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        
        showNotification('✅ Turno eliminado correctamente', 'success');
        loadShifts();
        
    } catch (error) {
        showNotification('❌ Error al eliminar: ' + error.message, 'error');
    }
}

// Filtros
function applyFilters() {
    const dateFilter = document.getElementById('filter-date').value;
    const roleFilter = document.getElementById('filter-role').value;
    const userFilter = document.getElementById('filter-user').value.toLowerCase();
    
    filteredShifts = allShifts.filter(shift => {
        const matchDate = !dateFilter || shift.date === dateFilter;
        const matchRole = !roleFilter || shift.role === roleFilter;
        const matchUser = !userFilter || 
            shift.user_name.toLowerCase().includes(userFilter) ||
            shift.user_id.toLowerCase().includes(userFilter);
        
        return matchDate && matchRole && matchUser;
    });
    
    displayShifts(filteredShifts);
}

function clearFilters() {
    document.getElementById('filter-date').value = '';
    document.getElementById('filter-role').value = '';
    document.getElementById('filter-user').value = '';
    filteredShifts = allShifts;
    displayShifts(filteredShifts);
}

// Vista
function setView(view) {
    currentView = view;
    document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
    document.getElementById('btn-list').classList.toggle('active', view === 'list');
    displayShifts(filteredShifts);
}

// Estadísticas
function updateStats() {
    const totalHours = allShifts.reduce((sum, shift) => sum + shift.hours, 0);
    totalShiftsEl.textContent = allShifts.length;
    totalHoursEl.textContent = totalHours;
}

// Calcular horas automáticamente
function calculateHours() {
    const start = document.getElementById('start_time').value;
    const end = document.getElementById('end_time').value;
    
    if (start && end) {
        const [startH, startM] = start.split(':').map(Number);
        const [endH, endM] = end.split(':').map(Number);
        
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;
        
        const hours = (endMin - startMin) / 60;
        document.getElementById('hours').value = Math.max(0, Math.round(hours * 10) / 10);
    }
}

// Notificaciones
function showNotification(text, type) {
    notificationText.textContent = text;
    notification.className = `notification ${type}`;
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    notification.classList.add('hidden');
}

// Utilidades
function showLoading() {
    loading.style.display = 'block';
    shiftsContainer.style.display = 'none';
    emptyState.classList.add('hidden');
}

function hideLoading() {
    loading.style.display = 'none';
    shiftsContainer.style.display = 'grid';
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getRoleIcon(role) {
    const icons = {
        'Voluntario': '👥',
        'Coordinador': '⭐',
        'Supervisor': '🎯'
    };
    return icons[role] || '👤';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}