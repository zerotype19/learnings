INSERT OR IGNORE INTO badges (id, name, icon, criteria_json) VALUES
 ('b_csuite','C-Suite Guru','🏢','{"type":"votes_received","threshold":100}'),
 ('b_deans','Dean''s Lister','🎓','{"type":"deans_list","count":1}'),
 ('b_viral','Viral Visionary','🚀','{"type":"shares","threshold":50}'),
 ('b_wall','Wall Warrior','📸','{"type":"wall_uploads","threshold":10}'),
 ('b_professor','Professor''s Pet','👨‍🏫','{"type":"ai_translations","threshold":25}'),
 ('b_networker','Corporate Networker','🤝','{"type":"followers","threshold":100}');
