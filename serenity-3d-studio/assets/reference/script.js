/* ==========================================================================
   Serenity 3D — The Observer & Mind-Watching Studio
   Vanilla ES6 · Three.js r128 (CDN) · Web Speech · Web Audio · localStorage
   MIT License · v1.0.0
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. CONTENT — twenty bilingual observer practices
     Cue times are authored on a 0–90s arc. At runtime each cue is scaled:
        scaled = (cue.time / 90) * (durationMinutes * 60)
     ------------------------------------------------------------------------ */
  const MODULES = [
    {
      id: 'sky',
      title_en: 'The Sky & the Clouds',
      title_th: 'ท้องฟ้ากับเมฆ',
      subtitle_en: 'Expanding awareness',
      subtitle_th: 'การขยายความรู้ตัว',
      practices: [
        {
          id: 'vast-blue-sky',
          title_en: 'The Vast Blue Sky',
          title_th: 'ท้องฟ้าสีครามอันกว้างใหญ่',
          cues: [
            { time: 0, text_en: 'Sit comfortably, resting your hands gently in your lap. Close your eyes or soften your gaze.', text_th: 'นั่งในท่าที่สบาย ปล่อยมือวางบนตักเบาๆ หลับตาลงหรือทอดสายตาลงต่ำ' },
            { time: 10, text_en: 'Take a slow, deep breath in... and release it fully. Let your shoulders drop.', text_th: 'หายใจเข้าลึกๆ ช้าๆ... แล้วถอนหายใจออกมาให้หมด ปล่อยหัวไหล่ให้ผ่อนคลาย' },
            { time: 25, text_en: 'Bring awareness to your mind. Picture it as a vast, clear blue sky stretching infinitely.', text_th: 'น้อมจิตมารู้สึกถึงใจ จินตนาการว่าใจของคุณเป็นท้องฟ้าสีฟ้าอันกว้างใหญ่ไร้ขอบเขต' },
            { time: 45, text_en: 'Your thoughts, plans, and worries are simply clouds passing through this open space.', text_th: 'ความคิด ความวางแผน และความกังวล เป็นเพียงเมฆที่ลอยผ่านเข้ามาในอวกาศนี้' },
            { time: 65, text_en: 'Some clouds are light, some are dark. Do not push them away or chase them. Simply watch them drift.', text_th: 'เมฆบางก้อนสว่าง บางก้อนมืดครึ้ม ไม่ต้องผลักไสหรือวิ่งตาม เพียงแค่มองดูมันลอยไป' },
            { time: 85, text_en: 'Remember: You are not the clouds. You are the vast, untouched sky in which they appear.', text_th: 'จำไว้ว่า: คุณไม่ใช่เมฆก้อนนั้น คุณคือท้องฟ้าอันกว้างใหญ่ที่คงเดิมเสมอ' }
          ]
        },
        {
          id: 'high-altitude-view',
          title_en: 'The High-Altitude View',
          title_th: 'มุมมองจากที่สูง',
          cues: [
            { time: 0, text_en: 'Imagine sitting at the peak of a high mountain, looking down at a distant valley.', text_th: 'จินตนาการว่าคุณกำลังนั่งอยู่บนยอดเขาสูง มองลงไปที่หุบเขาเบื้องล่าง' },
            { time: 20, text_en: 'Down below, mental traffic moves along the road—thoughts coming and going.', text_th: 'เบื้องล่าง มีการจราจรทางความคิดกำลังเคลื่อนไปตามถนน ความคิดวิ่งเข้าและออก' },
            { time: 45, text_en: 'Stay up on your quiet peak. Observe the traffic without stepping onto the road.', text_th: 'คงอยู่บนยอดเขาอันเงียบสงบ สังเกตการจราจรนั้นโดยไม่ต้องก้าวลงไปบนถนน' },
            { time: 70, text_en: 'Notice how every car eventually drives out of sight.', text_th: 'สังเกตดูว่ารถทุกคัน ในที่สุดก็ขับลับสายตาไป' }
          ]
        },
        {
          id: 'clearing-horizon',
          title_en: 'Clearing the Horizon',
          title_th: 'เปิดเส้นขอบฟ้าให้ปลอดโปร่ง',
          cues: [
            { time: 0, text_en: 'A heavy thought may enter your awareness. Allow it space to exist on the horizon.', text_th: 'ความคิดที่หนักอึ้งอาจลอยเข้ามา ให้พื้นที่มันดำรงอยู่ตรงเส้นขอบฟ้า' },
            { time: 25, text_en: 'Do not struggle with the weather. Watch the wind slowly carry the storm past.', text_th: 'ไม่ต้องต่อสู้กับสภาพอากาศ มองดูสายลมค่อยๆ พัดพายุนั้นผ่านพ้นไป' },
            { time: 55, text_en: 'Notice the clear blue horizon returning on its own.', text_th: 'สังเกตเห็นเส้นขอบฟ้าที่สดใสกลับคืนมาด้วยตัวมันเอง' }
          ]
        },
        {
          id: 'sunlight-mist',
          title_en: 'Sunlight Through the Mist',
          title_th: 'แสงแดดส่องผ่านหมอก',
          cues: [
            { time: 0, text_en: 'When the mind feels foggy or confused, do not try to force clarity.', text_th: 'เมื่อใจรู้สึกสับสนหรือมีหมอกปกคลุม ไม่ต้องพยายามบังคับให้มันกระจ่าง' },
            { time: 30, text_en: "Rest as the warm sunlight of awareness. Sunlight doesn't fight the mist; it simply shines.", text_th: 'พักอยู่ในแสงแดดอันอบอุ่นของความรู้ตัว แสงแดดไม่ได้ต่อสู้กับหมอก เพียงแค่ส่องสว่าง' },
            { time: 60, text_en: 'Watch the mist dissolve gradually in the light of steady presence.', text_th: 'มองดูหมอกค่อยๆ สลายตัวไปในแสงแห่งความรู้ตัวที่มั่นคง' }
          ]
        },
        {
          id: 'unscratched-mirror',
          title_en: 'The Unscratched Mirror',
          title_th: 'กระจกเงาที่ไร้รอยขีดข่วน',
          cues: [
            { time: 0, text_en: 'Visualize your awareness as a pristine, polished mirror.', text_th: 'จินตนาการถึงความรู้ตัวของคุณเหมือนกระจกเงาที่ใสสะอาด' },
            { time: 30, text_en: 'Images, emotions, and thoughts reflect upon its surface constantly.', text_th: 'ภาพ อารมณ์ และความคิด สะท้อนอยู่บนผิวกระจกตลอดเวลา' },
            { time: 60, text_en: 'No matter how dark the image, the mirror itself remains unstained and unscratched.', text_th: 'ไม่ว่าภาพจะมืดมนเพียงใด ตัวกระจกเองก็ไม่เคยหมองมัวหรือเกิดรอยขีดข่วน' }
          ]
        }
      ]
    },
    {
      id: 'stream',
      title_en: 'Leaves on a Stream',
      title_th: 'ใบไม้ในลำธาร',
      subtitle_en: 'Non-attachment',
      subtitle_th: 'การไม่ยึดติด',
      practices: [
        {
          id: 'forest-brook',
          title_en: 'The Forest Brook',
          title_th: 'ลำธารในป่า',
          cues: [
            { time: 0, text_en: 'Imagine sitting on the bank of a quiet forest stream, watching leaves float by.', text_th: 'จินตนาการว่าคุณกำลังนั่งอยู่ริมลำธารในป่าอันเงียบสงบ มองดูใบไม้ลอยผ่านไป' },
            { time: 20, text_en: 'As a thought arises, place it gently on a leaf and let it drop into the water.', text_th: 'เมื่อมีความคิดเกิดขึ้น วางมันลงบนใบไม้เบาๆ แล้วปล่อยให้มันตกลงสู่ผิวน้ำ' },
            { time: 45, text_en: 'Watch the stream carry the leaf around the bend and out of view.', text_th: 'มองดูลำธารพัดพาใบไม้นั้นคุ้งน้ำไปจนลับสายตา' },
            { time: 70, text_en: 'If your mind hooks onto a thought, notice the hook, uncurl your fingers, and return to the bank.', text_th: 'หากใจไปยึดติดกับความคิด ให้รู้ทัน ละความยึดติด แล้วกลับมานั่งบนฝั่งตามเดิม' }
          ]
        },
        {
          id: 'letting-go-anchor',
          title_en: 'Letting Go of the Anchor',
          title_th: 'ปล่อยวางสมอเรือ',
          cues: [
            { time: 0, text_en: 'Notice if you are holding tightly to a story or grievance right now.', text_th: 'สังเกตดูว่าคุณกำลังยึดถือเรื่องราวหรือความขุ่นเคืองใดไว้ในใจหรือไม่' },
            { time: 25, text_en: 'Feel the tension of holding on. Soften your hands. Place the story on a leaf.', text_th: 'ตระหนักถึงความตึงเครียดของการยึดติด ผ่อนคลายมือ ผ่อนคลายใจ วางเรื่องราวนั้นลงบนใบไม้' },
            { time: 55, text_en: 'Watch it float away down the current. Breathe in freedom.', text_th: 'มองมันลอยห่างออกไปตามกระแสน้ำ สูดหายใจรับความอิสระ' }
          ]
        },
        {
          id: 'rapids-pools',
          title_en: 'Rapid Rapids vs. Gentle Pools',
          title_th: 'น้ำเชี่ยวกับสระน้ำนิ่ง',
          cues: [
            { time: 0, text_en: 'Sometimes thoughts rush past like white-water rapids.', text_th: 'บางครั้งความคิดก็โหมกระหน่ำเหมือนสายน้ำเชี่ยว' },
            { time: 30, text_en: 'Do not jump into the rushing water to stop it. Stand securely on the shore.', text_th: 'อย่ากระโดดลงไปในน้ำเชี่ยวเพื่อหยุดมัน ยืนบนฝั่งอย่างมั่นคง' },
            { time: 60, text_en: 'Observe the wild water until it naturally widens into a serene pool.', text_th: 'เฝ้ามองสายน้ำที่เกรี้ยวกราด จนกว่ามันจะขยายออกเป็นสระน้ำที่สงบเอียบเย็นด้วยตัวมันเอง' }
          ]
        },
        {
          id: 'choosing-leaf',
          title_en: 'Choosing Which Leaf to Watch',
          title_th: 'เลือกใบไม้เพียงใบเดียว',
          cues: [
            { time: 0, text_en: 'When many thoughts compete for attention, pick just one prominent thought.', text_th: 'เมื่อมีความคิดมากมายแย่งชิงความสนใจ เลือกความคิดที่เด่นชัดที่สุดมาเพียงหนึ่งเดียว' },
            { time: 30, text_en: 'Place that single thought on a leaf and track it all the way down the river.', text_th: 'วางความคิดเดียวนั้นลงบนใบไม้ แล้วเฝ้ามองมันลอยไปตามลำธารจนสุดสายตา' },
            { time: 60, text_en: 'Let all other chatter drift past in the background.', text_th: 'ปล่อยให้เสียงรบกวนอื่นๆ ลอยผ่านไปในภูมิหลัง' }
          ]
        },
        {
          id: 'empty-riverbank',
          title_en: 'The Empty Riverbank',
          title_th: 'ริมฝั่งที่ว่างเปล่า',
          cues: [
            { time: 0, text_en: 'Rest your attention on the quiet stream between passing leaves.', text_th: 'พักความใส่ใจไว้ที่ลำธารอันเงียบสงบ ในช่วงเวลาที่ไม่มีใบไม้ลอยผ่าน' },
            { time: 30, text_en: 'Enjoy the stillness of the empty riverbank.', text_th: 'เพลิดเพลินกับความสงบเงียบของริมฝั่งน้ำที่ว่างเปล่า' },
            { time: 60, text_en: 'The water continues to flow, but your peace remains undisturbed.', text_th: 'สายน้ำยังคงไหลไป แต่ความสงบของคุณยังคงไม่ถูกรบกวน' }
          ]
        }
      ]
    },
    {
      id: 'theater',
      title_en: 'The Theater Screen',
      title_th: 'จอภาพยนตร์',
      subtitle_en: 'Impartial witness',
      subtitle_th: 'ผู้เฝ้ามองที่เป็นกลาง',
      practices: [
        {
          id: 'front-row-seat',
          title_en: 'Front Row Seat',
          title_th: 'ที่นั่งแถวหน้า',
          cues: [
            { time: 0, text_en: 'Step inside a quiet cinema and take a seat in the middle row.', text_th: 'ก้าวเข้าไปในโรงภาพยนตร์ที่เงียบสงบ แล้วนั่งลงที่แถวกลาง' },
            { time: 25, text_en: 'Look up at the blank screen ahead. You are the audience, not the movie.', text_th: 'มองขึ้นไปที่หน้าจอที่ว่างเปล่า คุณคือผู้ชม ไม่ใช่ตัวภาพยนตร์' },
            { time: 55, text_en: 'Whatever drama plays on screen, observe it safely from your chair.', text_th: 'ไม่ว่าเรื่องราวใดจะฉายอยู่บนจอ ให้เฝ้าดูมันอย่างปลอดภัยจากเก้าอี้ของคุณ' }
          ]
        },
        {
          id: 'turning-down-volume',
          title_en: 'Turning Down the Volume',
          title_th: 'ลดระดับเสียงลง',
          cues: [
            { time: 0, text_en: 'Notice a loud or self-critical thought playing in your mind.', text_th: 'สังเกตเห็นความคิดที่ดังรบกวน หรือความคิดที่ตัดสินตัวเองกำลังเล่นอยู่ในใจ' },
            { time: 30, text_en: 'Locate the volume dial in your mind. Slowly turn it counter-clockwise.', text_th: 'มองหาปุ่มปรับเสียงในใจ ค่อยๆ หมุนมันทวนเข็มนาฬิกา' },
            { time: 60, text_en: 'Listen as the harsh words drop into a soft, quiet whisper.', text_th: 'ฟังเสียงคำพูดที่รุนแรงนั้น ค่อยๆ เบาลงกลายเป็นเสียงกระซิบที่แผ่วเบา' }
          ]
        },
        {
          id: 'switching-genres',
          title_en: 'Switching Genres',
          title_th: 'เปลี่ยนแนวภาพยนตร์',
          cues: [
            { time: 0, text_en: 'Notice if your mind is playing a horror film or catastrophizing story.', text_th: 'สังเกตว่าใจของคุณกำลังฉายหนังสยองขวัญ หรือเรื่องราวคาดการณ์ในแง่ร้ายอยู่หรือไม่' },
            { time: 30, text_en: 'Step back into the projection booth. View the story as a neutral documentary.', text_th: 'ถอยกลับเข้าไปในห้องฉายหนัง มองเรื่องราวนั้นเป็นเพียงสารคดีที่เป็นกลาง' },
            { time: 60, text_en: 'It is just data on a screen, not a current reality.', text_th: 'มันเป็นเพียงข้อมูลบนหน้าจอ ไม่ใช่ความจริงในปัจจุบัน' }
          ]
        },
        {
          id: 'intermission',
          title_en: 'The Intermission',
          title_th: 'ช่วงพักระหว่างฉาก',
          cues: [
            { time: 0, text_en: 'Pause the internal movie for a brief intermission.', text_th: 'หยุดพักภาพยนตร์ภายในใจชั่วคราว' },
            { time: 30, text_en: 'The lights soften. The screen goes black. Rest in pure silence.', text_th: 'ไฟค่อยๆ หรี่ลง หน้าจอกลับเป็นสีดำ พักผ่อนในความเงียบสงบอันบริสุทธิ์' },
            { time: 60, text_en: 'Nothing to solve, nothing to review.', text_th: 'ไม่มีสิ่งใดต้องแก้ไข ไม่มีสิ่งใดต้องทบทวน' }
          ]
        },
        {
          id: 'behind-projector',
          title_en: 'Stepping Behind the Projector',
          title_th: 'ก้าวไปหลังเครื่องฉาย',
          cues: [
            { time: 0, text_en: 'Move your awareness behind the beam of light in the theater.', text_th: 'เลื่อนความรู้ตัวของคุณไปอยู่หลังลำแสงของเครื่องฉาย' },
            { time: 30, text_en: 'Realize that you are the light of awareness making the images visible.', text_th: 'ตระหนักว่าคุณคือแสงแห่งความรู้ตัว ที่ทำให้ภาพเหล่านั้นปรากฏขึ้น' },
            { time: 60, text_en: 'The images fade, but the light of awareness remains.', text_th: 'ภาพเหล่านั้นเลือนหายไป แต่แสงแห่งความรู้ตัวยังคงอยู่' }
          ]
        }
      ]
    },
    {
      id: 'everyday',
      title_en: 'Everyday Defusion & Noting',
      title_th: 'การคลายความคิดในชีวิตประจำวัน',
      subtitle_en: 'Noting in daily life',
      subtitle_th: 'การรู้ทันในชีวิตประจำวัน',
      practices: [
        {
          id: 'labeling-habit',
          title_en: 'The Labeling Habit',
          title_th: 'นิสัยการติดป้ายกำกับ',
          cues: [
            { time: 0, text_en: 'As you sit, notice the instant a thought appears.', text_th: 'ขณะที่คุณนั่งอยู่ ให้รู้ทันทันทีที่ความคิดปรากฏขึ้น' },
            { time: 25, text_en: "Apply a soft, neutral one-word label: 'Planning', 'Remembering', or 'Judging'.", text_th: "ติดป้ายกำกับเบาๆ ด้วยคำเดียวที่เป็นกลาง: 'วางแผน', 'ทรงจำ', หรือ 'ตัดสิน'" },
            { time: 55, text_en: 'Label it cleanly, like cataloging a specimen, and return to the breath.', text_th: 'ติดป้ายอย่างชัดเจน เหมือนการจำแนกตัวอย่าง แล้วกลับมาอยู่กับลมหายใจ' }
          ]
        },
        {
          id: 'i-notice',
          title_en: '"I Notice..." Reframing',
          title_th: 'การปรับกรอบด้วยคำว่า "ฉันรู้ทัน..."',
          cues: [
            { time: 0, text_en: 'When a difficult thought arises, reframe it in your mind.', text_th: 'เมื่อมีความคิดที่ยากลำบากเกิดขึ้น ให้ปรับกรอบความคิดนั้นใหม่ในใจ' },
            { time: 30, text_en: "Add the prefix: 'I notice the thought that...' before the statement.", text_th: "เติมคำนำหน้า: 'ฉันรู้ทันความคิดที่ว่า...' ก่อนข้อความนั้น" },
            { time: 60, text_en: 'Feel the immediate space created between you and the thought.', text_th: 'สัมผัสถึงช่องว่างที่เกิดขึ้นทันที ระหว่างตัวคุณกับความคิดนั้น' }
          ]
        },
        {
          id: 'physical-thought',
          title_en: 'Physical Sensation of Thought',
          title_th: 'ความรู้สึกทางกายของความคิด',
          cues: [
            { time: 0, text_en: 'Drop out of the verbal story in your head.', text_th: 'ถอนตัวออกมาจากเรื่องราวคำพูดในหัว' },
            { time: 30, text_en: 'Locate where this thought vibrates as physical sensation in your body.', text_th: 'ค้นหาว่าความคิดนี้สั่นสะเทือนเป็นความรู้สึกทางกายตรงไหนในร่างกาย' },
            { time: 60, text_en: 'Breathe into the chest, throat, or belly, releasing the mental narrative.', text_th: 'หายใจเข้าไปยังหน้าอก ลำคอ หรือท้อง ปล่อยวางเรื่องราวในความคิด' }
          ]
        },
        {
          id: 'welcoming-unwelcome',
          title_en: 'Welcoming the Unwelcome',
          title_th: 'ต้อนรับสิ่งที่ไม่ต้อนรับ',
          cues: [
            { time: 0, text_en: 'If a uncomfortable thought or emotion enters, stop resisting it.', text_th: 'หากมีความคิดหรืออารมณ์ที่ไม่สบายใจเข้ามา ให้หยุดต่อสู้กับมัน' },
            { time: 30, text_en: "Mentally say: 'Welcome, you are allowed to be here for a moment'.", text_th: "พูดในใจว่า: 'ยินดีต้อนรับ คุณสามารถอยู่ที่นี่ได้ชั่วคราว'" },
            { time: 60, text_en: 'Watch how non-resistance disarms its intensity.', text_th: 'มองดูว่าการไม่ต่อสู้ ช่วยลดความรุนแรงของมันลงได้อย่างไร' }
          ]
        },
        {
          id: 'flash-in-dark',
          title_en: 'The Flash in the Dark',
          title_th: 'แสงวาบในความมืด',
          cues: [
            { time: 0, text_en: 'Treat thoughts like sudden flashes of lightning in a dark night sky.', text_th: 'ปฏิบัติกับความคิดเหมือนสายฟ้าที่สว่างขึ้นทันทีในท้องฟ้าคืนมืด' },
            { time: 30, text_en: 'It flashes brilliantly, lights up the scene, and vanishes completely.', text_th: 'มันแลบสว่างไสว ส่องสว่างทั่วบริเวณ แล้วเลือนหายไปโดยสมบูรณ์' },
            { time: 60, text_en: 'Rest in the quiet dark that follows.', text_th: 'พักผ่อนในความมืดอันสงบเงียบที่ตามมา' }
          ]
        }
      ]
    }
  ];

  /* Flatten with a stable 1–20 index. */
  const PRACTICES = [];
  MODULES.forEach((m) => m.practices.forEach((p) => {
    PRACTICES.push(Object.assign({}, p, {
      index: PRACTICES.length + 1,
      moduleId: m.id,
      module_en: m.title_en,
      module_th: m.title_th
    }));
  }));

  /* ------------------------------------------------------------------------
     2. BILINGUAL INTERFACE COPY
     ------------------------------------------------------------------------ */
  const I18N = {
    en: {
      skip: 'Skip to session controls',
      brandSub: 'The Observer & Mind-Watching Studio',
      modeSky: 'Clouds', modeStream: 'Stream', modeOrb: 'Orb',
      libraryTitle: 'Practice Library',
      sessionLength: 'Session length',
      minutes: 'min',
      preset2: '2 Min Primer', preset5: '5 Min Pause', preset10: '10 Min Standard', preset15: '15 Min Deep', preset30: '30 Min',
      durationHint: 'Cue timing scales to the length you choose.',
      beginSession: 'Begin session', beginAgain: 'Begin again',
      cueIdle: 'Choose a practice, then let this quiet place hold what you notice.',
      captionSkyTitle: 'Clouds in the Sky',
      captionSkyText: 'Label a thought and watch it drift beyond the horizon.',
      captionStreamTitle: 'Leaves on a Stream',
      captionStreamText: 'Set each thought on a leaf and let the current carry it.',
      captionOrbTitle: 'Breathing Orb & Sanctuary',
      captionOrbText: 'Let the orb pace your breath; release thoughts as motes of light.',
      phaseReady: 'Ready', phaseRunning: 'In session', phasePaused: 'Paused', phaseDone: 'Complete',
      breathReady: 'Breathe naturally', breathInhale: 'Inhale', breathHold: 'Hold', breathExhale: 'Exhale', breathRest: 'Rest', breathNatural: 'Breathe naturally',
      logTitle: 'Observer’s Log',
      thoughtLabel: 'What’s on your mind?',
      thoughtPlaceholder: 'e.g. I should be doing more…',
      catThought: 'Thought', catEmotion: 'Emotion', catBody: 'Body',
      reframeEmpty: 'Your entry will be reframed as an observed event.',
      reframeThought: 'I notice the thought that ',
      reframeEmotion: 'I notice a feeling of ',
      reframeBody: 'I notice a sensation of ',
      addToScene: 'Release into the scene',
      recentNotes: 'Recent notes', clear: 'Clear',
      exportLog: '💾 Export mind-watching log',
      privacyHint: 'Everything stays in this browser. Nothing is uploaded.',
      settingsTitle: 'Settings',
      voiceTitle: 'Narration voice', voiceLabel: 'Voice',
      rate: 'Rate', pitch: 'Pitch',
      muteNarration: 'Mute spoken narration',
      testVoice: 'Test voice',
      gongTitle: 'Gong',
      gongPitch: 'Pitch', gongDecay: 'Decay', gongVolume: 'Strike volume',
      testGong: 'Strike the gong',
      ambienceTitle: 'Ambience',
      ambienceLabel: 'Soundscape',
      ambOff: 'Off', ambRain: 'Gentle rain', ambForest: 'Forest wind',
      ambienceVolume: 'Ambience volume',
      binauralLabel: 'Binaural tone',
      binOff: 'Off', binAlpha: 'Alpha — 10 Hz', binTheta: 'Theta — 6 Hz',
      breathPatternLabel: 'Breathing pattern',
      breathBox: 'Box breathing — 4·4·4·4',
      breath478: '4·7·8 relaxing breath',
      breathCalm: 'Calming breath — 4·2·6',
      autoAmbience: 'Start ambience with each session',
      dataTitle: 'Your data',
      dataHint: 'Practice history is stored only in this browser’s localStorage.',
      importLog: 'Import JSON', resetData: 'Reset all data',
      creditsTitle: 'Credits',
      creditsText: 'Built with OpenCode and DeepSeek V4.1 Flash. Three.js rendering, Web Speech narration and Web Audio synthesis — no backend, no tracking.',
      helpTitle: 'How to practise',
      help1: 'Choose a visualization: clouds for expansive awareness, a stream for non-attachment, or the orb for breath-led grounding.',
      help2: 'Pick one of the twenty practices and a session length. Cues scale evenly into the time you chose.',
      help3: 'When a thought pulls at you, type it and choose Thought, Emotion or Body. It is reframed as “I notice…” and released into the scene.',
      help4: 'Follow the narration, or mute it and read the cue card. Breathe with the small orb if you chose the sanctuary.',
      help5: 'End the session to record your streak. Export the JSON log any time from Settings.',
      helpNote: 'This is a self-reflection tool, not medical care. If thoughts feel overwhelming, step away and reach out to someone you trust or a qualified professional.',
      helpCredit: 'Created with OpenCode + DeepSeek V4.1 Flash. Source and reproduction guide included in the repository.',
      logEmpty: 'No notes yet. The first thought you release will appear here.',
      streakNone: 'Begin today to start a streak',
      streakOne: '1-day streak · {s} sessions',
      streakDays: '{n}-day streak · {s} sessions',
      toastSelect: 'Choose a practice before starting.',
      toastStarted: 'Session begun. Let everything be as it is.',
      toastPaused: 'Paused.',
      toastResumed: 'Resuming.',
      toastEnded: 'Session ended. Your progress was saved.',
      toastComplete: 'Session complete. That was time well spent with yourself.',
      toastLogged: 'Released into the scene.',
      toastCleared: 'Log cleared.',
      toastExported: 'Log exported.',
      toastImported: 'Data imported.',
      toastImportFail: 'That file is not a valid Serenity 3D export.',
      toastReset: 'All data cleared.',
      toastMuted: 'Narration muted.',
      toastUnmuted: 'Narration on.',
      toastNoSpeech: 'No voice is installed for the selected language.',
      toastSpeechUnsupported: 'This browser does not support speech narration.',
      toastNoThought: 'Type a short thought before releasing it.',
      confirmEnd: 'End this session now? The time you practised will still be saved.',
      confirmClear: 'Clear every note? This cannot be undone.',
      confirmReset: 'Reset all practice history, settings and notes?',
      gongStruck: 'Gong struck.',
      practiceCues: '{n} cues',
      voiceAuto: 'Automatic for language'
    },
    th: {
      skip: 'ข้ามไปที่ตัวควบคุมเซสชัน',
      brandSub: 'ห้องฝึกผู้เฝ้ามองและสติรู้ใจ',
      modeSky: 'เมฆ', modeStream: 'ลำธาร', modeOrb: 'ทรงกลม',
      libraryTitle: 'คลังการฝึก',
      sessionLength: 'ระยะเวลาเซสชัน',
      minutes: 'นาที',
      preset2: 'ปฐมบท 2 นาที', preset5: 'พักใจ 5 นาที', preset10: 'มาตรฐาน 10 นาที', preset15: 'ลงลึก 15 นาที', preset30: '30 นาที',
      durationHint: 'จังหวะคำแนะนำจะปรับตามเวลาที่คุณเลือก',
      beginSession: 'เริ่มเซสชัน', beginAgain: 'เริ่มอีกครั้ง',
      cueIdle: 'เลือกการฝึกสักบท แล้วปล่อยให้ความเงียบนี้โอบอุ้มสิ่งที่คุณสังเกตเห็น',
      captionSkyTitle: 'เมฆในท้องฟ้า',
      captionSkyText: 'ติดป้ายความคิดแล้วมองมันลอยเลยเส้นขอบฟ้าไป',
      captionStreamTitle: 'ใบไม้ในลำธาร',
      captionStreamText: 'วางแต่ละความคิดบนใบไม้ แล้วปล่อยให้กระแสน้ำพาไป',
      captionOrbTitle: 'ทรงกลมลมหายใจและสถานที่สงบ',
      captionOrbText: 'ให้ทรงกลมกำหนดจังหวะลมหายใจ ปล่อยความคิดเป็นละอองแสง',
      phaseReady: 'พร้อม', phaseRunning: 'กำลังฝึก', phasePaused: 'หยุดชั่วคราว', phaseDone: 'เสร็จสิ้น',
      breathReady: 'หายใจตามธรรมชาติ', breathInhale: 'หายใจเข้า', breathHold: 'กลั้นไว้', breathExhale: 'หายใจออก', breathRest: 'พัก', breathNatural: 'หายใจตามธรรมชาติ',
      logTitle: 'บันทึกของผู้เฝ้ามอง',
      thoughtLabel: 'ตอนนี้ใจของคุณมีอะไร?',
      thoughtPlaceholder: 'เช่น เราควรทำอะไรให้มากกว่านี้…',
      catThought: 'ความคิด', catEmotion: 'อารมณ์', catBody: 'ความรู้สึกทางกาย',
      reframeEmpty: 'ข้อความของคุณจะถูกเรียบเรียงใหม่ให้เป็นเหตุการณ์ที่ถูกเฝ้าดู',
      reframeThought: 'ฉันรู้ทันความคิดที่ว่า ',
      reframeEmotion: 'ฉันรู้ทันความรู้สึกว่า ',
      reframeBody: 'ฉันรู้ทันความรู้สึกทางกายว่า ',
      addToScene: 'ปล่อยเข้าสู่ฉาก',
      recentNotes: 'บันทึกล่าสุด', clear: 'ล้าง',
      exportLog: '💾 ส่งออกบันทึกการรู้ใจ (JSON)',
      privacyHint: 'ข้อมูลทั้งหมดอยู่ในเบราว์เซอร์นี้ ไม่มีการอัปโหลด',
      settingsTitle: 'การตั้งค่า',
      voiceTitle: 'เสียงบรรยาย', voiceLabel: 'เสียง',
      rate: 'ความเร็ว', pitch: 'ระดับเสียง',
      muteNarration: 'ปิดเสียงบรรยาย',
      testVoice: 'ทดลองเสียง',
      gongTitle: 'ฆ้อง',
      gongPitch: 'ระดับเสียง', gongDecay: 'ความกังวาน', gongVolume: 'ความดังเมื่อตี',
      testGong: 'ตีฆ้อง',
      ambienceTitle: 'เสียงแวดล้อม',
      ambienceLabel: 'เสียงธรรมชาติ',
      ambOff: 'ปิด', ambRain: 'ฝนโปรยเบาๆ', ambForest: 'ลมในป่า',
      ambienceVolume: 'ความดังเสียงแวดล้อม',
      binauralLabel: 'เสียงสองหู (Binaural)',
      binOff: 'ปิด', binAlpha: 'อัลฟา — 10 เฮิรตซ์', binTheta: 'ธีตา — 6 เฮิรตซ์',
      breathPatternLabel: 'รูปแบบการหายใจ',
      breathBox: 'หายใจสี่จังหวะ — 4·4·4·4',
      breath478: 'หายใจคลายเครียด 4·7·8',
      breathCalm: 'หายใจสงบ — 4·2·6',
      autoAmbience: 'เริ่มเสียงแวดล้อมพร้อมเซสชัน',
      dataTitle: 'ข้อมูลของคุณ',
      dataHint: 'ประวัติการฝึกถูกเก็บไว้ใน localStorage ของเบราว์เซอร์นี้เท่านั้น',
      importLog: 'นำเข้า JSON', resetData: 'ล้างข้อมูลทั้งหมด',
      creditsTitle: 'เครดิต',
      creditsText: 'สร้างด้วย OpenCode และ DeepSeek V4.1 Flash เรนเดอร์ด้วย Three.js บรรยายด้วย Web Speech และสังเคราะห์เสียงด้วย Web Audio — ไม่มีเซิร์ฟเวอร์ ไม่มีการติดตาม',
      helpTitle: 'วิธีฝึก',
      help1: 'เลือกภาพจินตนาการ: เมฆเพื่อขยายความรู้ตัว ลำธารเพื่อการไม่ยึดติด หรือทรงกลมเพื่อยึดเหนี่ยวกับลมหายใจ',
      help2: 'เลือกหนึ่งในยี่สิบการฝึกและระยะเวลา คำแนะนำจะกระจายอย่างสม่ำเสมอตามเวลาที่เลือก',
      help3: 'เมื่อความคิดดึงคุณไป พิมพ์มันลงไปแล้วเลือก ความคิด อารมณ์ หรือความรู้สึกทางกาย ระบบจะปรับเป็น “ฉันรู้ทัน…” และปล่อยเข้าสู่ฉาก',
      help4: 'ทำตามเสียงบรรยาย หรือปิดเสียงแล้วอ่านการ์ดคำแนะนำ หายใจตามทรงกลมเล็กหากเลือกสถานที่สงบ',
      help5: 'จบเซสชันเพื่อบันทึกสถิติต่อเนื่อง ส่งออกบันทึก JSON ได้ทุกเมื่อจากการตั้งค่า',
      helpNote: 'นี่คือเครื่องมือทบทวนตนเอง ไม่ใช่การรักษาทางการแพทย์ หากความคิดหนักอึ้งจนรับไม่ไหว โปรดพักและพูดคุยกับคนที่คุณไว้ใจหรือผู้เชี่ยวชาญ',
      helpCredit: 'สร้างด้วย OpenCode + DeepSeek V4.1 Flash ซอร์สโค้ดและคู่มือการสร้างซ้ำอยู่ในรีโป',
      logEmpty: 'ยังไม่มีบันทึก ความคิดแรกที่คุณปล่อยไปจะปรากฏที่นี่',
      streakNone: 'เริ่มวันนี้เพื่อสร้างสถิติต่อเนื่อง',
      streakOne: 'ฝึกต่อเนื่อง 1 วัน · ทั้งหมด {s} เซสชัน',
      streakDays: 'ฝึกต่อเนื่อง {n} วัน · ทั้งหมด {s} เซสชัน',
      toastSelect: 'เลือกการฝึกก่อนเริ่มเซสชัน',
      toastStarted: 'เซสชันเริ่มแล้ว ปล่อยให้ทุกอย่างเป็นไปตามธรรมชาติ',
      toastPaused: 'หยุดชั่วคราวแล้ว',
      toastResumed: 'ฝึกต่อ',
      toastEnded: 'จบเซสชันแล้ว บันทึกความก้าวหน้าให้คุณ',
      toastComplete: 'เสร็จสิ้นเซสชันอย่างสมบูรณ์ ใช้เวลากับตัวเองได้ดีมาก',
      toastLogged: 'ปล่อยความคิดเข้าสู่ฉากแล้ว',
      toastCleared: 'ล้างบันทึกแล้ว',
      toastExported: 'ส่งออกบันทึกแล้ว',
      toastImported: 'นำเข้าข้อมูลแล้ว',
      toastImportFail: 'ไฟล์นี้ไม่ใช่ข้อมูล Serenity 3D ที่ถูกต้อง',
      toastReset: 'ล้างข้อมูลทั้งหมดแล้ว',
      toastMuted: 'ปิดเสียงบรรยาย',
      toastUnmuted: 'เปิดเสียงบรรยาย',
      toastNoSpeech: 'เบราว์เซอร์นี้ไม่มีเสียงสำหรับภาษาที่เลือก',
      toastSpeechUnsupported: 'เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง',
      toastNoThought: 'พิมพ์ความคิดสั้นๆ ก่อนปล่อยเข้าฉาก',
      confirmEnd: 'จบเซสชันตอนนี้หรือไม่? เวลาที่ฝึกจะถูกบันทึกไว้',
      confirmClear: 'ล้างบันทึกทั้งหมดหรือไม่? การกระทำนี้ย้อนกลับไม่ได้',
      confirmReset: 'ล้างข้อมูลการฝึก การตั้งค่า และบันทึกทั้งหมดหรือไม่?',
      gongStruck: 'ตีฆ้องแล้ว',
      practiceCues: '{n} คำแนะนำ',
      voiceAuto: 'อัตโนมัติตามภาษา'
    }
  };

  /* ------------------------------------------------------------------------
     3. SMALL UTILITIES
     ------------------------------------------------------------------------ */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const VERSION = '1.0.0';
  const STORAGE_KEY = 'serenity3d.v1';
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const pad2 = (n) => String(n).padStart(2, '0');

  function formatTime(totalSec) {
    const s = Math.max(0, Math.floor(totalSec));
    const m = Math.floor(s / 60);
    return pad2(m) + ':' + pad2(s % 60);
  }

  function dateKey(ts) {
    const d = ts ? new Date(ts) : new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function t(key, vars) {
    const table = I18N[settings.lang] || I18N.en;
    let str = table[key] != null ? table[key] : (I18N.en[key] != null ? I18N.en[key] : key);
    if (vars) Object.keys(vars).forEach((k) => { str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    return str;
  }

  function safeParse(raw) {
    try { return JSON.parse(raw); } catch (err) { return null; }
  }

  function uid() {
    return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ------------------------------------------------------------------------
     4. PERSISTENCE
     ------------------------------------------------------------------------ */
  const DEFAULT_SETTINGS = {
    lang: 'en',
    mode: 'sky',
    durationMin: 10,
    practiceId: 'vast-blue-sky',
    voiceURI: '',
    rate: 0.9,
    pitch: 1,
    ttsMuted: false,
    gongPitch: 180,
    gongDecay: 6,
    gongVolume: 0.7,
    ambience: 'off',
    ambienceVolume: 0.35,
    binaural: 'off',
    breathPattern: 'box',
    autoAmbience: false
  };

  const DEFAULT_STATS = {
    sessions: 0,
    completed: 0,
    totalSeconds: 0,
    streak: 0,
    bestStreak: 0,
    lastDate: '',
    categories: { thought: 0, emotion: 0, body: 0 }
  };

  function normalizeSettings(input) {
    const s = Object.assign({}, DEFAULT_SETTINGS);
    if (!input || typeof input !== 'object') return s;
    if (input.lang === 'th' || input.lang === 'en') s.lang = input.lang;
    if (['sky', 'stream', 'sanctuary'].indexOf(input.mode) >= 0) s.mode = input.mode;
    if (Number.isFinite(+input.durationMin)) s.durationMin = clamp(Math.round(+input.durationMin), 1, 60);
    if (PRACTICES.some((p) => p.id === input.practiceId)) s.practiceId = input.practiceId;
    if (typeof input.voiceURI === 'string') s.voiceURI = input.voiceURI;
    if (Number.isFinite(+input.rate)) s.rate = clamp(+input.rate, 0.5, 1.4);
    if (Number.isFinite(+input.pitch)) s.pitch = clamp(+input.pitch, 0.6, 1.4);
    s.ttsMuted = !!input.ttsMuted;
    if (Number.isFinite(+input.gongPitch)) s.gongPitch = clamp(+input.gongPitch, 100, 440);
    if (Number.isFinite(+input.gongDecay)) s.gongDecay = clamp(+input.gongDecay, 1, 10);
    if (Number.isFinite(+input.gongVolume)) s.gongVolume = clamp(+input.gongVolume, 0, 1);
    if (['off', 'rain', 'forest'].indexOf(input.ambience) >= 0) s.ambience = input.ambience;
    if (Number.isFinite(+input.ambienceVolume)) s.ambienceVolume = clamp(+input.ambienceVolume, 0, 1);
    if (['off', 'alpha', 'theta'].indexOf(input.binaural) >= 0) s.binaural = input.binaural;
    if (['box', '478', 'calm'].indexOf(input.breathPattern) >= 0) s.breathPattern = input.breathPattern;
    s.autoAmbience = !!input.autoAmbience;
    return s;
  }

  function normalizeStats(input) {
    const s = Object.assign({}, DEFAULT_STATS, { categories: Object.assign({}, DEFAULT_STATS.categories) });
    if (!input || typeof input !== 'object') return s;
    ['sessions', 'completed', 'totalSeconds', 'streak', 'bestStreak'].forEach((k) => {
      if (Number.isFinite(+input[k])) s[k] = Math.max(0, Math.round(+input[k]));
    });
    if (typeof input.lastDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input.lastDate)) s.lastDate = input.lastDate;
    if (input.categories) {
      ['thought', 'emotion', 'body'].forEach((k) => {
        if (Number.isFinite(+input.categories[k])) s.categories[k] = Math.max(0, Math.round(+input.categories[k]));
      });
    }
    return s;
  }

  function normalizeLog(input) {
    if (!Array.isArray(input)) return [];
    return input.filter((e) => e && typeof e.raw === 'string' && e.raw.trim()).slice(-500).map((e) => ({
      id: typeof e.id === 'string' ? e.id : uid(),
      cat: ['thought', 'emotion', 'body'].indexOf(e.cat) >= 0 ? e.cat : 'thought',
      raw: e.raw.slice(0, 140),
      ts: Number.isFinite(+e.ts) ? +e.ts : Date.now(),
      practiceId: typeof e.practiceId === 'string' ? e.practiceId : ''
    }));
  }

  function readStore() {
    try { return safeParse(localStorage.getItem(STORAGE_KEY) || '') || {}; }
    catch (err) { return {}; }
  }

  const stored = readStore();
  const settings = normalizeSettings(stored.settings);
  const stats = normalizeStats(stored.stats);
  const log = normalizeLog(stored.log);

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        settings: settings,
        stats: stats,
        log: log.slice(-500)
      }));
      return true;
    } catch (err) {
      toast('Storage unavailable — progress will not persist.');
      return false;
    }
  }

  /* ------------------------------------------------------------------------
     5. RUNTIME STATE
     ------------------------------------------------------------------------ */
  const session = {
    running: false,
    paused: false,
    elapsed: 0,
    total: settings.durationMin * 60,
    fired: [],
    startedAt: 0,
    lastTick: 0,
    timer: null,
    complete: false,
    startMinutes: 0
  };
  let currentCategory = 'thought';
  let toastTimer = null;

  function getPractice(id) {
    return PRACTICES.find((p) => p.id === id) || PRACTICES[0];
  }

  function currentPractice() {
    return getPractice(settings.practiceId);
  }

  function scaledCueTime(cue, totalSec) {
    return (cue.time / 90) * totalSec;
  }

  function cueTextFor(practice, index) {
    const cue = practice.cues[index];
    if (!cue) return '';
    return settings.lang === 'th' ? cue.text_th : cue.text_en;
  }

  function reframe(raw, cat) {
    const key = cat === 'emotion' ? 'reframeEmotion' : (cat === 'body' ? 'reframeBody' : 'reframeThought');
    return t(key) + raw.trim();
  }

  /* ------------------------------------------------------------------------
     6. UI HELPERS
     ------------------------------------------------------------------------ */
  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function applyStaticI18n() {
    document.documentElement.lang = settings.lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    $$('[data-i18n-title]').forEach((el) => { el.title = t(el.getAttribute('data-i18n-title')); });
    $('#langLabel').textContent = settings.lang === 'en' ? 'ไทย' : 'EN';
    $('#soundIcon').textContent = settings.ttsMuted ? '🔇' : '🔊';
    $('#soundBtn').setAttribute('aria-pressed', String(!settings.ttsMuted));
    document.title = settings.lang === 'en'
      ? 'Serenity 3D — The Observer & Mind-Watching Studio'
      : 'Serenity 3D — ห้องฝึกผู้เฝ้ามองและสติรู้ใจ';
  }

  function renderDynamicCopy() {
    $('#modeCaptionTitle').textContent = t(settings.mode === 'sky' ? 'captionSkyTitle' : settings.mode === 'stream' ? 'captionStreamTitle' : 'captionOrbTitle');
    $('#modeCaptionText').textContent = t(settings.mode === 'sky' ? 'captionSkyText' : settings.mode === 'stream' ? 'captionStreamText' : 'captionOrbText');
    updatePhaseLabel();
    updateStreakHint();
    updateReframePreview();
    updateCueCard();
    updateBreathLabel(0, 0);
    if (!session.running) {
      $('#cueText').textContent = t('cueIdle');
      $('#cueIndex').textContent = '—';
    }
    $('#startBtn').querySelector('[data-i18n]').textContent = t(stats.sessions > 0 ? 'beginAgain' : 'beginSession');
    renderPracticeList();
    renderLog();
  }

  function updateStreakHint() {
    const el = $('#streakHint');
    if (!el) return;
    if (!stats.sessions) { el.textContent = t('streakNone'); return; }
    const streak = displayStreak();
    el.textContent = streak > 1
      ? t('streakDays', { n: streak, s: stats.sessions })
      : t('streakOne', { s: stats.sessions });
  }

  function displayStreak() {
    if (!stats.lastDate) return 0;
    const today = dateKey();
    const yesterday = dateKey(Date.now() - 86400000);
    return (stats.lastDate === today || stats.lastDate === yesterday) ? stats.streak : 0;
  }

  function updateRangeFill(input) {
    if (!input) return;
    const min = +input.min || 0;
    const max = +input.max || 100;
    const pct = ((+input.value - min) / (max - min)) * 100;
    input.style.setProperty('--fill', pct + '%');
  }

  /* ------------------------------------------------------------------------
     7. PRACTICE LIBRARY
     ------------------------------------------------------------------------ */
  function renderPracticeList() {
    const host = $('#practiceList');
    if (!host) return;
    host.innerHTML = '';
    MODULES.forEach((m) => {
      const label = document.createElement('div');
      label.className = 'module-label';
      label.textContent = settings.lang === 'th' ? m.title_th : m.title_en;
      host.appendChild(label);
      m.practices.forEach((p) => {
        const full = PRACTICES.find((x) => x.id === p.id);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'practice' + (settings.practiceId === p.id ? ' is-active' : '');
        btn.setAttribute('role', 'option');
        btn.setAttribute('aria-selected', String(settings.practiceId === p.id));
        btn.dataset.id = p.id;
        const num = document.createElement('span');
        num.className = 'practice-num';
        num.textContent = String(full.index).padStart(2, '0');
        const info = document.createElement('span');
        info.className = 'practice-name';
        info.textContent = settings.lang === 'th' ? p.title_th : p.title_en;
        const sub = document.createElement('span');
        sub.className = 'practice-sub';
        sub.textContent = t('practiceCues', { n: p.cues.length });
        info.appendChild(sub);
        btn.appendChild(num);
        btn.appendChild(info);
        btn.addEventListener('click', () => selectPractice(p.id));
        host.appendChild(btn);
      });
    });
  }

  function selectPractice(id) {
    if (session.running) {
      toast(settings.lang === 'th' ? 'จบเซสชันก่อนเปลี่ยนการฝึก' : 'End the current session before switching practices.');
      return;
    }
    settings.practiceId = id;
    persist();
    renderPracticeList();
    updateCueCard(true);
    updateStartLabel();
    const p = currentPractice();
    $('#sessionSeed').textContent = (settings.lang === 'th' ? p.title_th : p.title_en) + ' · #' + String(p.index).padStart(2, '0');
  }

  function updateStartLabel() {
    const span = $('#startBtn').querySelector('[data-i18n]');
    if (span) span.textContent = t(session.complete ? 'beginAgain' : 'beginSession');
  }

  /* ------------------------------------------------------------------------
     8. SESSION ENGINE
     ------------------------------------------------------------------------ */
  function setDuration(minutes) {
    if (session.running) return;
    settings.durationMin = clamp(Math.round(minutes), 1, 60);
    session.total = settings.durationMin * 60;
    session.elapsed = 0;
    $('#durationSlider').value = String(settings.durationMin);
    updateRangeFill($('#durationSlider'));
    $('#durationValue').textContent = String(settings.durationMin);
    $('#timeTotal').textContent = '/ ' + formatTime(session.total);
    $('#timeLabel').textContent = formatTime(session.total);
    $('#progressFill').style.width = '0%';
    $$('#durationPresets .chip').forEach((c) => c.classList.toggle('is-active', +c.dataset.min === settings.durationMin));
    persist();
  }

  function startSession() {
    if (session.running) return;
    if (!settings.practiceId) { toast(t('toastSelect')); return; }
    const practice = currentPractice();
    if (!practice) { toast(t('toastSelect')); return; }

    session.total = settings.durationMin * 60;
    session.elapsed = 0;
    session.fired = [];
    session.running = true;
    session.paused = false;
    session.complete = false;
    session.recorded = false;
    session.startedAt = Date.now();
    session.lastTick = performance.now();
    session.startMinutes = settings.durationMin;

    $('#startBtn').disabled = true;
    $('#pauseBtn').disabled = false;
    $('#endBtn').disabled = false;
    $('#pauseBtn').textContent = '⏸';
    setControlsDisabled(true);
    updatePhaseLabel();
    updateCueCard(true);
    playGong();
    if (settings.autoAmbience) {
      if (settings.ambience !== 'off') audio.startAmbience();
      if (settings.binaural !== 'off') audio.startBinaural();
    }

    clearInterval(session.timer);
    session.timer = setInterval(tick, 200);
    tick();
    toast(t('toastStarted'));
  }

  function tick() {
    if (!session.running) return;
    const now = performance.now();
    if (!session.paused) {
      const delta = (now - session.lastTick) / 1000;
      session.elapsed += Math.max(0, delta);
    }
    session.lastTick = now;

    const elapsed = session.elapsed;
    const total = session.total;
    const practice = currentPractice();

    for (let i = session.fired.length; i < practice.cues.length; i++) {
      if (elapsed >= scaledCueTime(practice.cues[i], total) - 0.05) {
        session.fired.push(i);
        showCue(i);
        if (!session.paused) speakCue(practice, i);
      } else break;
    }

    const pct = clamp((elapsed / total) * 100, 0, 100);
    $('#progressFill').style.width = pct.toFixed(2) + '%';
    $('#timeLabel').textContent = formatTime(Math.max(0, total - elapsed));
    updateBreathLabel(session.paused ? 0 : now);

    if (elapsed >= total) finishSession(true);
  }

  function showCue(index) {
    const practice = currentPractice();
    const cue = practice.cues[index];
    if (!cue) return;
    $('#cueText').textContent = settings.lang === 'th' ? cue.text_th : cue.text_en;
    $('#cueIndex').textContent = (settings.lang === 'th' ? 'คำแนะนำ' : 'Cue') + ' ' + (index + 1) + ' / ' + practice.cues.length;
    $('#cueCard').classList.add('is-speaking');
    setTimeout(() => $('#cueCard').classList.remove('is-speaking'), 1400);
    updateBreathFromClock();
  }

  function updateCueCard(reset) {
    const practice = currentPractice();
    if (reset) {
      $('#cueIndex').textContent = (settings.lang === 'th' ? 'การฝึก' : 'Practice') + ' ' + practice.index + ' · ' + practice.cues.length;
      if (!session.running) {
        $('#cueText').textContent = cueTextFor(practice, 0);
        $('#cueIndex').textContent = (settings.lang === 'th' ? 'การฝึก' : 'Practice') + ' ' + practice.index + ' · ' + (settings.lang === 'th' ? 'เริ่มเมื่อพร้อม' : 'ready when you are');
      }
    }
    if (!session.running) {
      $('#sessionSeed').textContent = (settings.lang === 'th' ? practice.title_th : practice.title_en) + ' · #' + String(practice.index).padStart(2, '0');
    }
  }

  function refreshCueLanguage() {
    if (!session.running) return;
    const practice = currentPractice();
    const index = session.fired.length ? session.fired[session.fired.length - 1] : 0;
    const cue = practice.cues[index];
    if (!cue) return;
    $('#cueText').textContent = settings.lang === 'th' ? cue.text_th : cue.text_en;
    $('#cueIndex').textContent = (settings.lang === 'th' ? 'คำแนะนำ' : 'Cue') + ' ' + (index + 1) + ' / ' + practice.cues.length;
  }

  function pauseSession() {
    if (!session.running || session.paused) return;
    session.paused = true;
    updatePhaseLabel();
    $('#pauseBtn').textContent = '▶';
    $('#pauseBtn').setAttribute('aria-label', 'Resume session');
    if ('speechSynthesis' in window) window.speechSynthesis.pause();
    toast(t('toastPaused'));
  }

  function resumeSession() {
    if (!session.running || !session.paused) return;
    session.paused = false;
    session.lastTick = performance.now();
    updatePhaseLabel();
    $('#pauseBtn').textContent = '⏸';
    $('#pauseBtn').setAttribute('aria-label', 'Pause session');
    if ('speechSynthesis' in window) window.speechSynthesis.resume();
    toast(t('toastResumed'));
  }

  function endSession(manual) {
    if (!session.running && !session.complete) return;
    const wasComplete = session.complete;
    const elapsed = Math.min(session.elapsed, session.total);
    clearInterval(session.timer);
    session.timer = null;
    session.running = false;
    session.paused = false;
    session.complete = true;

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopGong();
    audio.fadeOutAmbience();
    if (manual) playGong();

    if (!wasComplete && elapsed >= 20) recordSession(elapsed, elapsed >= session.total * 0.95);
    if (wasComplete && !session.recorded) recordSession(session.total, true);
    session.recorded = true;

    $('#startBtn').disabled = false;
    $('#pauseBtn').disabled = true;
    $('#endBtn').disabled = true;
    $('#pauseBtn').textContent = '⏸';
    setControlsDisabled(false);
    updatePhaseLabel();
    updateStartLabel();
    updateStreakHint();
    $('#progressFill').style.width = (wasComplete ? 100 : clamp((elapsed / session.total) * 100, 0, 100)).toFixed(2) + '%';
    $('#timeLabel').textContent = wasComplete ? '00:00' : formatTime(Math.max(0, session.total - elapsed));
    if (manual) toast(t('toastEnded'));
  }

  function finishSession(auto) {
    if (!session.running) return;
    session.complete = true;
    session.running = false;
    session.paused = false;
    clearInterval(session.timer);
    session.timer = null;
    session.recorded = true;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    playGong();
    audio.fadeOutAmbience();
    recordSession(session.total, true);
    $('#startBtn').disabled = false;
    $('#pauseBtn').disabled = true;
    $('#endBtn').disabled = true;
    setControlsDisabled(false);
    updatePhaseLabel();
    updateStartLabel();
    updateStreakHint();
    $('#progressFill').style.width = '100%';
    $('#timeLabel').textContent = '00:00';
    toast(t('toastComplete'));
  }

  function recordSession(seconds, completed) {
    stats.sessions += 1;
    if (completed) stats.completed += 1;
    stats.totalSeconds += Math.round(seconds);
    const today = dateKey();
    if (stats.lastDate !== today) {
      const yesterday = dateKey(Date.now() - 86400000);
      stats.streak = stats.lastDate === yesterday ? stats.streak + 1 : 1;
      stats.lastDate = today;
      stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    }
    persist();
    updateStreakHint();
  }

  function resetSessionUI() {
    session.running = false;
    session.paused = false;
    session.elapsed = 0;
    session.fired = [];
    session.complete = false;
    session.recorded = false;
    session.total = settings.durationMin * 60;
    clearInterval(session.timer);
    session.timer = null;
    $('#startBtn').disabled = false;
    $('#pauseBtn').disabled = true;
    $('#endBtn').disabled = true;
    $('#pauseBtn').textContent = '⏸';
    setControlsDisabled(false);
    $('#progressFill').style.width = '0%';
    $('#timeLabel').textContent = formatTime(session.total);
    $('#timeTotal').textContent = '/ ' + formatTime(session.total);
    updatePhaseLabel();
    updateCueCard(true);
    updateStartLabel();
  }

  function setControlsDisabled(disabled) {
    $('#durationSlider').disabled = disabled;
    $$('#durationPresets .chip').forEach((c) => { c.disabled = disabled; });
    $$('.practice').forEach((b) => { b.disabled = disabled; });
  }

  function updatePhaseLabel() {
    const el = $('#phaseLabel');
    if (!el) return;
    let key = 'phaseReady', mode = 'idle';
    if (session.running && session.paused) { key = 'phasePaused'; mode = 'paused'; }
    else if (session.running) { key = 'phaseRunning'; mode = 'running'; }
    else if (session.complete) { key = 'phaseDone'; mode = 'done'; }
    el.textContent = t(key);
    el.dataset.state = mode;
  }

  /* ------------------------------------------------------------------------
     9. BREATH PACING
     ------------------------------------------------------------------------ */
  const BREATH_PATTERNS = {
    box: [{ key: 'breathInhale', dur: 4 }, { key: 'breathHold', dur: 4 }, { key: 'breathExhale', dur: 4 }, { key: 'breathRest', dur: 4 }],
    '478': [{ key: 'breathInhale', dur: 4 }, { key: 'breathHold', dur: 7 }, { key: 'breathExhale', dur: 8 }],
    calm: [{ key: 'breathInhale', dur: 4 }, { key: 'breathHold', dur: 2 }, { key: 'breathExhale', dur: 6 }]
  };

  function breathState(now) {
    const pattern = BREATH_PATTERNS[settings.breathPattern] || BREATH_PATTERNS.box;
    const cycle = pattern.reduce((a, p) => a + p.dur, 0);
    const phaseSec = ((now || 0) / 1000) % cycle;
    let acc = 0;
    for (let i = 0; i < pattern.length; i++) {
      const p = pattern[i];
      if (phaseSec < acc + p.dur) {
        const local = phaseSec - acc;
        const frac = local / p.dur;
        let scale = 0.6;
        if (p.key === 'breathInhale') scale = 0.6 + 0.55 * smoothstep(frac);
        else if (p.key === 'breathHold') scale = 0.6 + 0.55;
        else if (p.key === 'breathExhale') scale = 0.6 + 0.55 * (1 - smoothstep(frac));
        else scale = 0.6;
        return { key: p.key, remaining: Math.ceil(p.dur - local), scale: scale, frac: frac };
      }
      acc += p.dur;
    }
    return { key: 'breathNatural', remaining: 0, scale: 0.6, frac: 0 };
  }

  function smoothstep(x) {
    const v = clamp(x, 0, 1);
    return v * v * (3 - 2 * v);
  }

  function updateBreathLabel(now, scale) {
    const label = $('#breathLabel');
    if (!label) return;
    if (!session.running) { label.textContent = t('breathReady'); setBreathScale(0.55); return; }
    const b = breathState(session.paused ? 0 : now);
    label.textContent = t(b.key) + (b.remaining > 0 ? ' · ' + b.remaining : '');
    setBreathScale(scale != null ? scale : b.scale);
  }

  function setBreathScale(scale) {
    document.documentElement.style.setProperty('--breath-scale', String(scale));
    if (window.Serenity && window.Serenity._setOrbScale) window.Serenity._setOrbScale(scale);
  }

  function updateBreathFromClock() {
    if (!session.running) return;
    updateBreathLabel(performance.now());
  }

  /* ------------------------------------------------------------------------
     10. TEXT-TO-SPEECH
     ------------------------------------------------------------------------ */
  const tts = {
    voices: [],
    utterance: null,
    supported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  };

  function targetLang() { return settings.lang === 'th' ? 'th-TH' : 'en-US'; }

  function loadVoices() {
    if (!tts.supported) return;
    tts.voices = window.speechSynthesis.getVoices() || [];
    populateVoiceSelect();
  }

  function populateVoiceSelect() {
    const sel = $('#voiceSelect');
    if (!sel) return;
    const lang = settings.lang === 'th' ? 'th' : 'en';
    const matching = tts.voices.filter((v) => (v.lang || '').toLowerCase().indexOf(lang) === 0);
    const list = matching.length ? matching : tts.voices;
    sel.innerHTML = '';
    const auto = document.createElement('option');
    auto.value = '';
    auto.textContent = t('voiceAuto');
    sel.appendChild(auto);
    list.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      opt.textContent = v.name + ' (' + v.lang + ')' + (v.localService ? '' : ' ·');
      sel.appendChild(opt);
    });
    const saved = list.some((v) => v.voiceURI === settings.voiceURI) ? settings.voiceURI : '';
    sel.value = saved;
    if (saved !== settings.voiceURI) { settings.voiceURI = saved; persist(); }
  }

  function pickVoice() {
    if (!tts.voices.length) return null;
    if (settings.voiceURI) {
      const chosen = tts.voices.find((v) => v.voiceURI === settings.voiceURI);
      if (chosen) return chosen;
    }
    const lang = targetLang().slice(0, 2).toLowerCase();
    const exact = tts.voices.find((v) => (v.lang || '').toLowerCase() === targetLang().toLowerCase());
    const loose = tts.voices.find((v) => (v.lang || '').toLowerCase().indexOf(lang) === 0);
    return exact || loose || tts.voices[0] || null;
  }

  function speak(text, opts) {
    if (!tts.supported || settings.ttsMuted || !text) return;
    const voice = pickVoice();
    if (!voice) {
      if (!tts.warned) { tts.warned = true; toast(t('toastNoSpeech')); }
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;
      u.lang = voice.lang || targetLang();
      u.rate = settings.rate;
      u.pitch = settings.pitch;
      u.volume = 0.95;
      u.onend = () => { $('#cueCard').classList.remove('is-speaking'); };
      tts.utterance = u;
      window.speechSynthesis.speak(u);
    } catch (err) { /* narration is optional */ }
  }

  function speakCue(practice, index) {
    if (!practice || settings.ttsMuted) return;
    const cue = practice.cues[index];
    if (!cue) return;
    speak(settings.lang === 'th' ? cue.text_th : cue.text_en);
  }

  /* ------------------------------------------------------------------------
     11. WEB AUDIO — gong, pink-noise ambience, binaural tones
     ------------------------------------------------------------------------ */
  const audio = {
    ctx: null,
    master: null,
    ambienceGain: null,
    ambienceNodes: [],
    binauralGain: null,
    binauralNodes: [],
    gongNodes: [],
    ambienceOn: false
  };

  function audioCtx() {
    if (!audio.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audio.ctx = new Ctx();
      audio.master = audio.ctx.createGain();
      audio.master.gain.value = 0.9;
      audio.master.connect(audio.ctx.destination);
    }
    if (audio.ctx.state === 'suspended') audio.ctx.resume();
    return audio.ctx;
  }

  function playGong() {
    const ctx = audioCtx();
    if (!ctx) return;
    stopGong();
    const now = ctx.currentTime;
    const base = settings.gongPitch;
    const decay = settings.gongDecay;
    const vol = settings.gongVolume;
    if (vol <= 0) return;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, now);
    out.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol * 0.55), now + 0.012);
    out.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    out.connect(audio.master);

    const partials = [
      { ratio: 1, gain: 1, type: 'sine' },
      { ratio: 2.02, gain: 0.34, type: 'sine' },
      { ratio: 2.74, gain: 0.16, type: 'triangle' },
      { ratio: 4.1, gain: 0.08, type: 'sine' }
    ];
    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = p.type;
      osc.frequency.setValueAtTime(base * p.ratio, now);
      osc.frequency.exponentialRampToValueAtTime(base * p.ratio * 0.985, now + decay);
      g.gain.value = p.gain;
      osc.connect(g); g.connect(out);
      osc.start(now); osc.stop(now + decay + 0.1);
      audio.gongNodes.push(osc);
    });

    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    const carrier = ctx.createOscillator();
    const carrierGain = ctx.createGain();
    mod.frequency.value = base * 1.41;
    modGain.gain.value = base * 0.7;
    carrier.frequency.value = base;
    mod.connect(modGain); modGain.connect(carrier.frequency);
    carrierGain.gain.value = 0.06;
    carrier.connect(carrierGain); carrierGain.connect(out);
    mod.start(now); carrier.start(now); mod.stop(now + decay); carrier.stop(now + decay);
    audio.gongNodes.push(mod, carrier);
  }

  function stopGong() {
    audio.gongNodes.forEach((n) => { try { n.stop(); } catch (err) {} });
    audio.gongNodes = [];
  }

  function pinkNoiseBuffer(ctx, seconds) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  function startAmbience() {
    const ctx = audioCtx();
    if (!ctx || settings.ambience === 'off') { stopAmbience(); return; }
    stopAmbience();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, settings.ambienceVolume * 0.35), ctx.currentTime + 1.2);
    gain.connect(audio.master);
    audio.ambienceGain = gain;

    const src = ctx.createBufferSource();
    src.buffer = pinkNoiseBuffer(ctx, 4);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    let lfo = null, lfoGain = null;
    if (settings.ambience === 'rain') {
      filter.type = 'highpass';
      filter.frequency.value = 900;
      const smooth = ctx.createBiquadFilter();
      smooth.type = 'lowpass';
      smooth.frequency.value = 7200;
      src.connect(filter); filter.connect(smooth); smooth.connect(gain);
      audio.ambienceNodes.push(src, filter, smooth);
    } else {
      filter.type = 'lowpass';
      filter.frequency.value = 620;
      const smooth = ctx.createBiquadFilter();
      smooth.type = 'highpass';
      smooth.frequency.value = 90;
      lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      lfoGain = ctx.createGain();
      lfoGain.gain.value = 260;
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
      src.connect(filter); filter.connect(smooth); smooth.connect(gain);
      lfo.start();
      audio.ambienceNodes.push(src, filter, smooth, lfo, lfoGain);
    }
    src.start();
    audio.ambienceOn = true;
  }

  function stopAmbience() {
    audio.ambienceNodes.forEach((n) => {
      try { if (n.stop) n.stop(); } catch (err) {}
      try { n.disconnect(); } catch (err) {}
    });
    audio.ambienceNodes = [];
    if (audio.ambienceGain) {
      try { audio.ambienceGain.disconnect(); } catch (err) {}
      audio.ambienceGain = null;
    }
    stopBinaural();
    audio.ambienceOn = false;
  }

  function fadeOutAmbience() {
    if (!audio.ctx || !audio.ambienceGain) { stopAmbience(); return; }
    const g = audio.ambienceGain;
    const now = audio.ctx.currentTime;
    try {
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    } catch (err) {}
    const b = audio.binauralGain;
    if (b) { try { b.gain.exponentialRampToValueAtTime(0.0001, now + 1.2); } catch (err) {} }
    setTimeout(stopAmbience, 1600);
  }

  function startBinaural() {
    const ctx = audioCtx();
    if (!ctx) return;
    stopBinaural();
    const base = 174;
    const beat = settings.binaural === 'theta' ? 6 : 10;
    const gain = ctx.createGain();
    gain.gain.value = 0.035;
    gain.connect(audio.master);
    audio.binauralGain = gain;
    const merger = ctx.createChannelMerger(2);
    merger.connect(gain);
    [0, 1].forEach((side) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = base + (side === 0 ? 0 : beat);
      g.gain.value = 0.5;
      osc.connect(g);
      g.connect(merger, 0, side);
      osc.start();
      audio.binauralNodes.push(osc, g);
    });
    audio.binauralNodes.push(merger);
  }

  function stopBinaural() {
    audio.binauralNodes.forEach((n) => {
      try { if (n.stop) n.stop(); } catch (err) {}
      try { n.disconnect(); } catch (err) {}
    });
    audio.binauralNodes = [];
    if (audio.binauralGain) {
      try { audio.binauralGain.disconnect(); } catch (err) {}
      audio.binauralGain = null;
    }
  }

  // Public audio surface used by the session engine and debug API.
  audio.startAmbience = startAmbience;
  audio.fadeOutAmbience = fadeOutAmbience;
  audio.startBinaural = startBinaural;
  audio.stopBinaural = stopBinaural;

  /* ------------------------------------------------------------------------
     12. THREE.JS WORLD
     ------------------------------------------------------------------------ */
  const world = {
    ready: false,
    renderer: null,
    camera: null,
    controls: null,
    clock: null,
    scenes: {},
    active: 'sky',
    camTween: null,
    userObjects: [],
    labels: [],
    orb: null,
    orbRings: [],
    water: null,
    cloudField: [],
    leaves: [],
    motes: null,
    raf: 0,
    failed: false
  };

  const CAMERA_PRESETS = {
    sky: { pos: [0, 5.4, 18], target: [0, 10.5, -24] },
    stream: { pos: [0, 6.4, 15], target: [0, 0.6, -9] },
    sanctuary: { pos: [0, 3.6, 9.4], target: [0, 2.2, 0] }
  };

  function cameraPreset(mode) {
    const p = CAMERA_PRESETS[mode] || CAMERA_PRESETS.sky;
    return {
      pos: new THREE.Vector3(p.pos[0], p.pos[1], p.pos[2]),
      target: new THREE.Vector3(p.target[0], p.target[1], p.target[2])
    };
  }

  function initWorld() {
    if (!window.THREE) { world.failed = true; return; }
    try {
      const canvas = $('#scene-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      world.renderer = renderer;

      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 600);
      const skyPreset = cameraPreset('sky');
      camera.position.copy(skyPreset.pos);
      world.camera = camera;

      const controls = new THREE.OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;
      controls.maxPolarAngle = Math.PI * 0.78;
      controls.minPolarAngle = Math.PI * 0.18;
      controls.autoRotate = !prefersReducedMotion();
      controls.autoRotateSpeed = 0.32;
      controls.target.copy(skyPreset.target);
      world.controls = controls;

      world.clock = new THREE.Clock();
      buildSkyScene();
      buildStreamScene();
      buildSanctuaryScene();
      world.active = settings.mode;
      applyModeVisual(settings.mode, true);
      world.ready = true;
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', () => {
        if (!world.clock) return;
        if (document.hidden) { world.raf && cancelAnimationFrame(world.raf); world.raf = 0; }
        else if (!world.raf) { world.clock.getDelta(); animate(); }
      });
      animate();
    } catch (err) {
      world.failed = true;
      console.warn('Serenity 3D: WebGL unavailable', err);
    }
  }

  function onResize() {
    if (!world.renderer || !world.camera) return;
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();
    world.renderer.setSize(window.innerWidth, window.innerHeight);
    world.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  function skyDome(top, bottom, radius) {
    const geo = new THREE.SphereGeometry(radius || 300, 32, 18);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(top) },
        bottomColor: { value: new THREE.Color(bottom) },
        offset: { value: 24 },
        exponent: { value: 0.72 }
      },
      vertexShader: 'varying vec3 vWorld; void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vWorld = wp.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 topColor; uniform vec3 bottomColor; uniform float offset; uniform float exponent; varying vec3 vWorld; void main(){ float h = normalize(vWorld + vec3(0.0, offset, 0.0)).y; gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h,0.0), exponent), 0.0)), 1.0); }',
      side: THREE.BackSide,
      depthWrite: false
    });
    return new THREE.Mesh(geo, mat);
  }

  function dotTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(220,250,255,.85)');
    grd.addColorStop(1, 'rgba(170,235,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  function sunSprite(size) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(128, 128, 4, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255,252,225,1)');
    grd.addColorStop(0.18, 'rgba(255,240,190,.95)');
    grd.addColorStop(0.5, 'rgba(255,215,150,.28)');
    grd.addColorStop(1, 'rgba(255,210,150,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(size, size, 1);
    return sprite;
  }

  function cloudMesh(scale, shade) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: shade || 0xf6fbff,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.94,
      flatShading: false
    });
    const puffs = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < puffs; i++) {
      const r = 0.85 + Math.random() * 1.5;
      const geo = new THREE.SphereGeometry(r, 12, 10);
      const puff = new THREE.Mesh(geo, mat);
      puff.position.set((Math.random() - 0.5) * 5.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 2.6);
      puff.scale.y = 0.72 + Math.random() * 0.2;
      group.add(puff);
    }
    group.scale.setScalar(scale || 1);
    return group;
  }

  function buildSkyScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xbfd9e8, 0.0065);
    scene.add(skyDome(0x2c6fa6, 0xe6f2f6, 280));

    const hemi = new THREE.HemisphereLight(0xdff4ff, 0x7f9c93, 0.95);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff2d8, 1.25);
    sun.position.set(-28, 40, 18);
    scene.add(sun);

    const sunDisc = sunSprite(36);
    sunDisc.position.set(-70, 80, -150);
    scene.add(sunDisc);

    // A soft sea of clouds below the observer.
    for (let i = 0; i < 16; i++) {
      const c = cloudMesh(2.4 + Math.random() * 2.2, 0xffffff);
      c.position.set((Math.random() - 0.5) * 110, -14 - Math.random() * 5, -55 - Math.random() * 70);
      c.scale.y *= 0.55;
      scene.add(c);
    }

    for (let i = 0; i < 14; i++) {
      const cloud = cloudMesh(0.9 + Math.random() * 0.9);
      cloud.position.set((Math.random() - 0.5) * 78, 7 + Math.random() * 11, -52 + Math.random() * 26);
      cloud.userData.speed = 0.28 + Math.random() * 0.38;
      cloud.userData.bob = Math.random() * Math.PI * 2;
      scene.add(cloud);
      world.cloudField.push(cloud);
    }

    // Far mountain silhouettes anchor the sky world.
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x5d7f8c, roughness: 1, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 7; i++) {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(12 + Math.random() * 10, 10 + Math.random() * 10, 5), hillMat);
      hill.position.set((i - 3) * 18, -3 - Math.random() * 3, -70 - Math.random() * 30);
      hill.rotation.y = Math.random() * Math.PI;
      scene.add(hill);
    }

    world.scenes.sky = scene;
  }

  function waterMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDeep: { value: new THREE.Color(0x17566b) },
        uShallow: { value: new THREE.Color(0x6cc9be) },
        uSky: { value: new THREE.Color(0xc4e5e2) }
      },
      vertexShader: [
        'uniform float uTime; varying vec2 vUv; varying float vWave;',
        'void main(){ vUv = uv; vec3 p = position;',
        'float w = sin(p.x * 0.55 + uTime * 1.15) * 0.07 + sin(p.y * 0.31 - uTime * 0.8) * 0.055;',
        'p.z += w; vWave = w;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }'
      ].join('\n'),
      fragmentShader: [
        'uniform float uTime; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uSky;',
        'varying vec2 vUv; varying float vWave;',
        'void main(){',
        'float flow = sin(vUv.y * 26.0 - uTime * 1.25 + sin(vUv.x * 7.0) * 1.6) * 0.5 + 0.5;',
        'float flow2 = sin(vUv.y * 41.0 - uTime * 1.8 + vUv.x * 4.0) * 0.5 + 0.5;',
        'float glint = pow(flow, 10.0) * 0.16 + pow(flow2, 18.0) * 0.07;',
        'float depthMix = smoothstep(0.0, 1.0, vUv.x);',
        'vec3 col = mix(uShallow, uDeep, depthMix * 0.6 + 0.14);',
        'col = mix(col, uSky, 0.14 + glint * 0.3);',
        'col += glint * 0.5;',
        'float edge = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);',
        'gl_FragColor = vec4(col, 0.95 * edge + 0.03); }'
      ].join('\n'),
      transparent: true,
      side: THREE.DoubleSide
    });
  }

  function makeTree(x, z, s) {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * s, 0.18 * s, 1.1 * s, 6),
      new THREE.MeshStandardMaterial({ color: 0x5b4634, roughness: 1 })
    );
    trunk.position.y = 0.55 * s;
    g.add(trunk);
    const greens = [0x3f7355, 0x4f8862, 0x35634c];
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry((1.1 - i * 0.22) * s, 1.5 * s, 7),
        new THREE.MeshStandardMaterial({ color: greens[i % greens.length], roughness: 1 })
      );
      cone.position.y = (1.2 + i * 0.75) * s;
      g.add(cone);
    }
    g.position.set(x, 0, z);
    return g;
  }

  function buildStreamScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x9dbfb4, 0.017);
    scene.add(skyDome(0x4f8294, 0xd7e6ce, 240));

    const hemi = new THREE.HemisphereLight(0xe8fff4, 0x3d5a44, 0.85);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff2cf, 1.15);
    key.position.set(12, 24, 8);
    scene.add(key);

    const water = new THREE.Mesh(new THREE.PlaneGeometry(26, 120, 64, 120), waterMaterial());
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, 0.02, -22);
    scene.add(water);
    world.water = water;

    const bankMat = new THREE.MeshStandardMaterial({ color: 0x4c7052, roughness: 1 });
    [-1, 1].forEach((side) => {
      const bank = new THREE.Mesh(new THREE.BoxGeometry(18, 1.6, 120), bankMat);
      bank.position.set(side * 22, -0.4, -22);
      scene.add(bank);
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(18, 0.7, 120),
        new THREE.MeshStandardMaterial({ color: 0x62835f, roughness: 1 })
      );
      edge.position.set(side * 21.6, 0.35, -22);
      scene.add(edge);
    });

    for (let i = 0; i < 26; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const tree = makeTree(side * (15 + Math.random() * 8), -50 + Math.random() * 70, 0.8 + Math.random() * 1.1);
      scene.add(tree);
    }
    for (let i = 0; i < 14; i++) {
      const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.8, 0),
        new THREE.MeshStandardMaterial({ color: 0x65706a, roughness: 1, flatShading: true })
      );
      rock.position.set((Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 3), 0.2, -50 + Math.random() * 70);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      scene.add(rock);
    }

    for (let i = 0; i < 12; i++) {
      const leaf = makeLeafMesh();
      leaf.position.set((Math.random() - 0.5) * 14, 0.1, -55 + Math.random() * 70);
      leaf.userData.speed = 1.2 + Math.random() * 1.4;
      leaf.userData.spin = (Math.random() - 0.5) * 1.2;
      scene.add(leaf);
      world.leaves.push(leaf);
    }

    // Fireflies over the far bank.
    const fireGeo = new THREE.BufferGeometry();
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = 0.4 + Math.random() * 5;
      positions[i * 3 + 2] = -40 + Math.random() * 50;
    }
    fireGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const fireMat = new THREE.PointsMaterial({ color: 0xf9e6a7, size: 0.26, map: dotTexture(), transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
    const fireflies = new THREE.Points(fireGeo, fireMat);
    scene.add(fireflies);
    scene.userData.fireflies = fireflies;

    world.scenes.stream = scene;
  }

  function makeLeafMesh() {
    const geo = new THREE.SphereGeometry(0.34, 9, 7);
    const mat = new THREE.MeshStandardMaterial({ color: 0xc98a45, roughness: 0.85, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.set(1, 0.12, 1.55);
    return mesh;
  }

  function buildSanctuaryScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x081426, 0.028);
    scene.add(skyDome(0x050b16, 0x122a44, 240));

    const ambient = new THREE.AmbientLight(0x5f8fb0, 0.45);
    scene.add(ambient);
    const key = new THREE.PointLight(0x9ff5ff, 1.0, 40);
    key.position.set(4, 8, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7d8cff, 1.0, 30);
    rim.position.set(-6, 3, -5);
    scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(16, 72),
      new THREE.MeshStandardMaterial({ color: 0x0c1b2e, roughness: 0.55, metalness: 0.55 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.35;
    scene.add(floor);

    for (let i = 1; i <= 5; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(i * 2.1, i * 2.1 + 0.035, 96),
        new THREE.MeshBasicMaterial({ color: 0x67d3dc, transparent: true, opacity: 0.16 + i * 0.03, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.33;
      scene.add(ring);
    }

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 2.5, 0.55, 48),
      new THREE.MeshStandardMaterial({ color: 0x16344c, roughness: 0.4, metalness: 0.6 })
    );
    pedestal.position.y = 0;
    scene.add(pedestal);

    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x63d8e6, emissive: 0x188fa8, emissiveIntensity: 0.7,
      roughness: 0.38, metalness: 0.18, transparent: true, opacity: 0.95
    });
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 4), orbMat);
    orb.position.y = 2.55;
    scene.add(orb);
    world.orb = orb;

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x7fe3dc, transparent: true, opacity: 0.07, side: THREE.BackSide })
    );
    halo.position.copy(orb.position);
    scene.add(halo);
    world.orbHalo = halo;

    const ringSpecs = [
      { r: 2.05, tilt: 0.7, speed: 0.16, color: 0x7fe3dc },
      { r: 2.5, tilt: -0.45, speed: -0.11, color: 0x8fa8ff },
      { r: 2.95, tilt: 1.25, speed: 0.07, color: 0xf3cf8a }
    ];
    ringSpecs.forEach((spec) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(spec.r, 0.018, 8, 140),
        new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: 0.55 })
      );
      ring.position.copy(orb.position);
      ring.rotation.x = spec.tilt;
      ring.rotation.y = spec.tilt * 0.6;
      ring.userData.speed = spec.speed;
      scene.add(ring);
      world.orbRings.push(ring);
    });

    // Orbiting motes of light.
    const moteGeo = new THREE.BufferGeometry();
    const count = 160;
    const positions = new Float32Array(count * 3);
    const seeds = [];
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const height = 0.5 + Math.random() * 7;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      seeds.push({ radius: radius, angle: angle, height: height, speed: 0.05 + Math.random() * 0.12 });
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const moteMat = new THREE.PointsMaterial({ color: 0xa8f4ff, size: 0.28, map: dotTexture(), transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
    const motes = new THREE.Points(moteGeo, moteMat);
    motes.userData.seeds = seeds;
    scene.add(motes);
    world.motes = motes;

    world.scenes.sanctuary = scene;
  }

  function labelSprite(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 960, 200);
    let size = 42;
    ctx.font = '600 ' + size + 'px "Avenir Next", "Segoe UI", "Sarabun", "Noto Sans Thai", sans-serif';
    const maxWidth = 840;
    let display = text;
    if (ctx.measureText(display).width > maxWidth) {
      size = 32;
      ctx.font = '600 ' + size + 'px "Avenir Next", "Segoe UI", "Sarabun", "Noto Sans Thai", sans-serif';
    }
    if (ctx.measureText(display).width > maxWidth) {
      while (display.length > 1 && ctx.measureText(display + '…').width > maxWidth) display = display.slice(0, -1);
      display += '…';
    }
    const w = Math.min(maxWidth + 24, ctx.measureText(display).width + 58);
    const x = (960 - w) / 2;
    const y = 40;
    const h = 104;
    const r = 32;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 18, 31, 0.78)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(127, 227, 220, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = '#eafcff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(display, 480, y + h / 2 + 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(5.2, 1.08, 1);
    sprite.renderOrder = 20;
    return sprite;
  }

  function addThoughtToWorld(raw, cat) {
    if (!world.ready) return;
    const scene = world.scenes[world.active];
    if (!scene) return;
    const text = reframe(raw, cat);
    const label = labelSprite(text);
    let host;
    let kind;

    if (world.active === 'sky') {
      kind = 'cloud';
      host = cloudMesh(0.55 + Math.random() * 0.25, 0xffffff);
      host.position.set((Math.random() - 0.5) * 10, 12 + Math.random() * 3, -18 - Math.random() * 8);
      label.position.set(0, 3.6, 0);
      label.scale.set(16, 3.33, 1);
      host.add(label);
      const leader = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(0, 2.5, 0)]),
        new THREE.LineBasicMaterial({ color: 0x7fe3dc, transparent: true, opacity: 0.38 })
      );
      host.add(leader);
      host.userData.drift = 0.45 + Math.random() * 0.3;
    } else if (world.active === 'stream') {
      kind = 'leaf';
      host = new THREE.Group();
      const leaf = makeLeafMesh();
      leaf.scale.set(1.15, 0.14, 1.7);
      host.add(leaf);
      host.position.set((Math.random() - 0.5) * 8, 0.18, -14);
      label.position.set(0, 1.25, 0);
      label.scale.set(8.6, 1.79, 1);
      host.add(label);
      host.userData.drift = 0.9 + Math.random() * 0.5;
    } else {
      kind = 'mote';
      host = new THREE.Group();
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 12, 10),
        new THREE.MeshBasicMaterial({ color: 0xa8f4ff, transparent: true, opacity: 1, blending: THREE.AdditiveBlending })
      );
      host.add(glow);
      host.position.set((world.orb.position.x || 0) + (Math.random() - 0.5) * 5, 1.4 + Math.random() * 1.4, (world.orb.position.z || 0) + 2.2);
      label.position.set(0, 0.9, 0);
      label.scale.set(2.7, 0.56, 1);
      host.add(label);
      host.userData.target = world.orb.position.clone();
    }

    host.userData.kind = kind;
    host.userData.age = 0;
    host.userData.ttl = kind === 'mote' ? 7.5 : 18;
    scene.add(host);
    world.userObjects.push(host);
    if (world.userObjects.length > 12) {
      const old = world.userObjects.shift();
      disposeObject(old);
    }
  }

  function disposeObject(obj) {
    if (!obj) return;
    if (obj.parent) obj.parent.remove(obj);
    obj.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
      }
    });
  }

  function updateUserObjects(dt) {
    for (let i = world.userObjects.length - 1; i >= 0; i--) {
      const obj = world.userObjects[i];
      const data = obj.userData;
      data.age += dt;
      const life = clamp(1 - (data.age - (data.ttl - 3)) / 3, 0, 1);
      if (data.kind === 'cloud') {
        obj.position.x += data.drift * dt;
        obj.position.y += Math.sin(data.age * 0.6) * 0.004;
        if (obj.position.x > 18) obj.position.x = -18;
      } else if (data.kind === 'leaf') {
        obj.position.z += data.drift * dt;
        obj.position.x += Math.sin(data.age * 1.4) * 0.12 * dt;
        obj.rotation.z = Math.sin(data.age * 1.2) * 0.25;
        obj.rotation.y += dt * 0.35;
      } else if (data.kind === 'mote' && data.target) {
        obj.position.lerp(data.target, Math.min(1, dt * 0.9));
        if (obj.position.distanceTo(data.target) < 0.35) data.age = Math.max(data.age, data.ttl - 1.2);
      }
      if (life < 1) {
        obj.traverse((child) => {
          if (child.material && child.material.transparent) child.material.opacity = Math.min(child.material.opacity, life);
        });
      }
      if (data.age >= data.ttl) {
        world.userObjects.splice(i, 1);
        disposeObject(obj);
      }
    }
  }

  function setOrbScale(scale) {
    const s = clamp(scale, 0.5, 1.25);
    if (world.orb) {
      world.orb.scale.setScalar(0.82 + s * 0.5);
      if (world.orb.material) world.orb.material.emissiveIntensity = 0.8 + s * 0.9;
    }
    if (world.orbHalo) {
      world.orbHalo.scale.setScalar(0.9 + s * 0.42);
      if (world.orbHalo.material) world.orbHalo.material.opacity = 0.04 + s * 0.06;
    }
  }

  function applyModeVisual(mode, instant) {
    world.active = mode;
    const preset = cameraPreset(mode);
    if (world.controls) {
      world.controls.autoRotate = !prefersReducedMotion();
    }
    if (instant || !world.camera) {
      if (world.camera) world.camera.position.copy(preset.pos);
      if (world.controls) world.controls.target.copy(preset.target);
      world.camTween = null;
    } else {
      world.camTween = {
        fromPos: world.camera.position.clone(),
        toPos: preset.pos.clone(),
        fromTarget: world.controls.target.clone(),
        toTarget: preset.target.clone(),
        t: 0
      };
    }
    document.body.dataset.world = mode;
    $$('.mode-btn').forEach((b) => {
      const on = b.dataset.mode === mode;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function animate() {
    if (!world.ready) return;
    world.raf = requestAnimationFrame(animate);
    const dt = Math.min(world.clock.getDelta(), 0.05);
    const now = performance.now();
    const scene = world.scenes[world.active];
    if (!scene) return;

    if (world.camTween) {
      const tw = world.camTween;
      tw.t = Math.min(1, tw.t + dt * 1.4);
      const e = smoothstep(tw.t);
      world.camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
      world.controls.target.lerpVectors(tw.fromTarget, tw.toTarget, e);
      if (tw.t >= 1) world.camTween = null;
    }

    if (world.active === 'sky') {
      world.cloudField.forEach((c) => {
        c.position.x += c.userData.speed * dt;
        c.position.y += Math.sin((c.userData.bob += dt * 0.35)) * 0.003;
        if (c.position.x > 46) { c.position.x = -46; c.position.z = -64 + Math.random() * 30; }
      });
    } else if (world.active === 'stream') {
      if (world.water) world.water.material.uniforms.uTime.value += dt;
      world.leaves.forEach((leaf) => {
        leaf.position.z += leaf.userData.speed * dt;
        leaf.position.x += Math.sin(leaf.position.z * 0.15) * 0.006;
        leaf.rotation.z += leaf.userData.spin * dt;
        leaf.rotation.y += dt * 0.4;
        if (leaf.position.z > 26) {
          leaf.position.z = -54;
          leaf.position.x = (Math.random() - 0.5) * 14;
        }
      });
      const fireflies = scene.userData.fireflies;
      if (fireflies) {
        fireflies.rotation.y += dt * 0.015;
        fireflies.material.opacity = 0.45 + Math.sin(now / 1700) * 0.2;
      }
    } else {
      world.orbRings.forEach((r) => { r.rotation.z += r.userData.speed * dt; r.rotation.y += r.userData.speed * 0.4 * dt; });
      if (world.motes) {
        const pos = world.motes.geometry.attributes.position;
        const seeds = world.motes.userData.seeds;
        for (let i = 0; i < seeds.length; i++) {
          const s = seeds[i];
          s.angle += s.speed * dt;
          pos.setX(i, Math.cos(s.angle) * s.radius);
          pos.setZ(i, Math.sin(s.angle) * s.radius);
          pos.setY(i, s.height + Math.sin(now / 2400 + i) * 0.18);
        }
        pos.needsUpdate = true;
      }
      updateBreathLabel(now);
    }

    updateUserObjects(dt);
    world.controls.update();
    world.renderer.render(scene, world.camera);
  }

  /* ------------------------------------------------------------------------
     13. LOG RENDERING AND EXPORT
     ------------------------------------------------------------------------ */
  function renderLog() {
    const list = $('#logList');
    if (!list) return;
    list.innerHTML = '';
    const items = log.slice(-60).reverse();
    $('#logCount').textContent = String(log.length);
    if (!items.length) {
      const li = document.createElement('li');
      li.className = 'log-empty';
      li.textContent = t('logEmpty');
      list.appendChild(li);
      return;
    }
    items.forEach((entry) => {
      const li = document.createElement('li');
      li.className = 'log-entry';
      const head = document.createElement('div');
      head.className = 'log-entry-head';
      const cat = document.createElement('span');
      cat.className = 'log-cat';
      cat.dataset.cat = entry.cat;
      cat.textContent = t(entry.cat === 'emotion' ? 'catEmotion' : entry.cat === 'body' ? 'catBody' : 'catThought');
      const time = document.createElement('span');
      time.className = 'log-time';
      const d = new Date(entry.ts);
      time.textContent = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
      head.appendChild(cat); head.appendChild(time);
      const txt = document.createElement('p');
      txt.className = 'log-text';
      txt.textContent = reframe(entry.raw, entry.cat);
      li.appendChild(head); li.appendChild(txt);
      list.appendChild(li);
    });
  }

  function addThought(raw, cat) {
    const clean = String(raw || '').trim().slice(0, 140);
    if (!clean) { toast(t('toastNoThought')); return false; }
    const entry = { id: uid(), cat: cat || 'thought', raw: clean, ts: Date.now(), practiceId: settings.practiceId };
    log.push(entry);
    if (log.length > 500) log.splice(0, log.length - 500);
    stats.categories[entry.cat] = (stats.categories[entry.cat] || 0) + 1;
    persist();
    addThoughtToWorld(clean, entry.cat);
    renderLog();
    return true;
  }

  function updateReframePreview() {
    const el = $('#reframePreview');
    const input = $('#thoughtInput');
    if (!el || !input) return;
    const raw = input.value.trim();
    el.textContent = raw ? reframe(raw, currentCategory) : t('reframeEmpty');
  }

  function exportData() {
    return {
      app: 'Serenity 3D — The Observer & Mind-Watching Studio',
      version: VERSION,
      exportedAt: new Date().toISOString(),
      settings: Object.assign({}, settings),
      stats: Object.assign({}, stats, { categories: Object.assign({}, stats.categories) }),
      entries: log.map((e) => ({
        id: e.id,
        category: e.cat,
        original: e.raw,
        reframed_en: I18N.en['reframe' + (e.cat === 'emotion' ? 'Emotion' : e.cat === 'body' ? 'Body' : 'Thought')] + e.raw,
        reframed_th: I18N.th['reframe' + (e.cat === 'emotion' ? 'Emotion' : e.cat === 'body' ? 'Body' : 'Thought')] + e.raw,
        timestamp: new Date(e.ts).toISOString()
      })),
      practicesCompleted: PRACTICES.length
    };
  }

  function downloadJSON() {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'serenity3d-mind-log-' + dateKey() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast(t('toastExported'));
  }

  function importData(raw) {
    const parsed = safeParse(raw);
    if (!parsed || (parsed.app && parsed.app.indexOf('Serenity') < 0)) { toast(t('toastImportFail')); return false; }
    if (parsed.settings) Object.assign(settings, normalizeSettings(parsed.settings));
    if (parsed.stats) Object.assign(stats, normalizeStats(parsed.stats));
    if (Array.isArray(parsed.entries)) {
      const imported = parsed.entries.map((e) => ({
        id: uid(),
        cat: e.category || 'thought',
        raw: e.original || e.raw || '',
        ts: e.timestamp ? Date.parse(e.timestamp) || Date.now() : Date.now(),
        practiceId: ''
      }));
      log.length = 0;
      normalizeLog(imported).forEach((e) => log.push(e));
    } else if (Array.isArray(parsed.log)) {
      log.length = 0;
      normalizeLog(parsed.log).forEach((e) => log.push(e));
    }
    persist();
    syncSettingsUI();
    applyStaticI18n();
    renderDynamicCopy();
    applyModeVisual(settings.mode, true);
    resetSessionUI();
    toast(t('toastImported'));
    return true;
  }

  /* ------------------------------------------------------------------------
     14. SETTINGS UI
     ------------------------------------------------------------------------ */
  function syncSettingsUI() {
    $('#durationSlider').value = String(settings.durationMin);
    $('#durationValue').textContent = String(settings.durationMin);
    updateRangeFill($('#durationSlider'));
    $$('#durationPresets .chip').forEach((c) => c.classList.toggle('is-active', +c.dataset.min === settings.durationMin));

    $('#rateRange').value = String(settings.rate);
    $('#rateValue').textContent = settings.rate.toFixed(2);
    updateRangeFill($('#rateRange'));
    $('#pitchRange').value = String(settings.pitch);
    $('#pitchValue').textContent = settings.pitch.toFixed(2);
    updateRangeFill($('#pitchRange'));
    $('#ttsMute').checked = settings.ttsMuted;
    $('#gongPitch').value = String(settings.gongPitch);
    $('#gongPitchValue').textContent = Math.round(settings.gongPitch) + ' Hz';
    updateRangeFill($('#gongPitch'));
    $('#gongDecay').value = String(settings.gongDecay);
    $('#gongDecayValue').textContent = (+settings.gongDecay).toFixed(1) + ' s';
    updateRangeFill($('#gongDecay'));
    $('#gongVolume').value = String(settings.gongVolume);
    $('#gongVolumeValue').textContent = Math.round(settings.gongVolume * 100) + '%';
    updateRangeFill($('#gongVolume'));
    $('#ambienceSelect').value = settings.ambience;
    $('#ambienceVolume').value = String(settings.ambienceVolume);
    $('#ambienceVolumeValue').textContent = Math.round(settings.ambienceVolume * 100) + '%';
    updateRangeFill($('#ambienceVolume'));
    $('#binauralSelect').value = settings.binaural;
    $('#breathSelect').value = settings.breathPattern;
    $('#autoAmbience').checked = settings.autoAmbience;
    populateVoiceSelect();
    $('#timeTotal').textContent = '/ ' + formatTime(settings.durationMin * 60);
    if (!session.running) $('#timeLabel').textContent = formatTime(settings.durationMin * 60);
    updateStreakHint();
    updateReframePreview();
  }

  /* ------------------------------------------------------------------------
     15. WIRING
     ------------------------------------------------------------------------ */
  function bindEvents() {
    // Modes
    $$('.mode-btn').forEach((btn) => btn.addEventListener('click', () => {
      settings.mode = btn.dataset.mode;
      persist();
      applyModeVisual(settings.mode);
      renderDynamicCopy();
    }));

    // Language
    $('#langBtn').addEventListener('click', () => {
      settings.lang = settings.lang === 'en' ? 'th' : 'en';
      persist();
      applyStaticI18n();
      renderDynamicCopy();
      syncSettingsUI();
      populateVoiceSelect();
      refreshCueLanguage();
    });

    // Sound mute
    $('#soundBtn').addEventListener('click', () => {
      settings.ttsMuted = !settings.ttsMuted;
      persist();
      applyStaticI18n();
      $('#soundIcon').textContent = settings.ttsMuted ? '🔇' : '🔊';
      if (settings.ttsMuted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      toast(t(settings.ttsMuted ? 'toastMuted' : 'toastUnmuted'));
    });

    // Duration
    $('#durationPresets').addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      setDuration(+btn.dataset.min);
    });
    $('#durationSlider').addEventListener('input', (e) => {
      updateRangeFill(e.target);
      $('#durationValue').textContent = e.target.value;
      setDuration(+e.target.value);
    });

    // Session transport
    $('#startBtn').addEventListener('click', startSession);
    $('#pauseBtn').addEventListener('click', () => { session.paused ? resumeSession() : pauseSession(); });
    $('#endBtn').addEventListener('click', () => {
      if (session.running && !window.confirm(t('confirmEnd'))) return;
      endSession(true);
    });

    // Thought log
    const input = $('#thoughtInput');
    input.addEventListener('input', updateReframePreview);
    $$('.cat-btn').forEach((btn) => btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      $$('.cat-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      updateReframePreview();
    }));
    $('#thoughtForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if (addThought(input.value, currentCategory)) {
        input.value = '';
        updateReframePreview();
        toast(t('toastLogged'));
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        $('#thoughtForm').requestSubmit();
      }
    });
    $('#clearLogBtn').addEventListener('click', () => {
      if (!log.length) return;
      if (!window.confirm(t('confirmClear'))) return;
      log.length = 0;
      stats.categories = { thought: 0, emotion: 0, body: 0 };
      persist();
      renderLog();
      toast(t('toastCleared'));
    });
    $('#exportBtn').addEventListener('click', downloadJSON);
    $('#exportBtnSettings').addEventListener('click', downloadJSON);

    // Settings controls
    $('#voiceSelect').addEventListener('change', (e) => { settings.voiceURI = e.target.value; persist(); });
    $('#rateRange').addEventListener('input', (e) => {
      settings.rate = +e.target.value;
      $('#rateValue').textContent = settings.rate.toFixed(2);
      updateRangeFill(e.target);
      persist();
    });
    $('#pitchRange').addEventListener('input', (e) => {
      settings.pitch = +e.target.value;
      $('#pitchValue').textContent = settings.pitch.toFixed(2);
      updateRangeFill(e.target);
      persist();
    });
    $('#ttsMute').addEventListener('change', (e) => {
      settings.ttsMuted = e.target.checked;
      persist();
      $('#soundIcon').textContent = settings.ttsMuted ? '🔇' : '🔊';
      $('#soundBtn').setAttribute('aria-pressed', String(!settings.ttsMuted));
      if (settings.ttsMuted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    });
    $('#testVoiceBtn').addEventListener('click', () => {
      const p = currentPractice();
      speak(settings.lang === 'th' ? p.cues[0].text_th : p.cues[0].text_en);
    });
    $('#gongPitch').addEventListener('input', (e) => {
      settings.gongPitch = +e.target.value;
      $('#gongPitchValue').textContent = Math.round(settings.gongPitch) + ' Hz';
      updateRangeFill(e.target);
      persist();
    });
    $('#gongDecay').addEventListener('input', (e) => {
      settings.gongDecay = +e.target.value;
      $('#gongDecayValue').textContent = (+settings.gongDecay).toFixed(1) + ' s';
      updateRangeFill(e.target);
      persist();
    });
    $('#gongVolume').addEventListener('input', (e) => {
      settings.gongVolume = +e.target.value;
      $('#gongVolumeValue').textContent = Math.round(settings.gongVolume * 100) + '%';
      updateRangeFill(e.target);
      persist();
    });
    $('#testGongBtn').addEventListener('click', () => { playGong(); toast(t('gongStruck')); });
    $('#ambienceSelect').addEventListener('change', (e) => {
      settings.ambience = e.target.value;
      persist();
      if (settings.ambience === 'off') {
        stopAmbience();
        if (settings.binaural !== 'off') startBinaural();
      } else startAmbience();
    });    $('#ambienceVolume').addEventListener('input', (e) => {
      settings.ambienceVolume = +e.target.value;
      $('#ambienceVolumeValue').textContent = Math.round(settings.ambienceVolume * 100) + '%';
      updateRangeFill(e.target);
      if (audio.ambienceGain && audio.ctx) audio.ambienceGain.gain.setTargetAtTime(settings.ambienceVolume * 0.35, audio.ctx.currentTime, 0.1);
      persist();
    });
    $('#binauralSelect').addEventListener('change', (e) => {
      settings.binaural = e.target.value;
      persist();
      if (settings.binaural === 'off') stopBinaural();
      else startBinaural();
    });
    $('#breathSelect').addEventListener('change', (e) => {
      settings.breathPattern = e.target.value;
      persist();
      updateBreathLabel(performance.now());
    });
    $('#autoAmbience').addEventListener('change', (e) => { settings.autoAmbience = e.target.checked; persist(); });

    $('#importBtn').addEventListener('click', () => $('#importFile').click());
    $('#importFile').addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const ok = importData(String(reader.result || ''));
        if (!ok) toast(t('toastImportFail'));
      };
      reader.readAsText(file);
      e.target.value = '';
    });
    $('#resetBtn').addEventListener('click', () => {
      if (!window.confirm(t('confirmReset'))) return;
      localStorage.removeItem(STORAGE_KEY);
      Object.assign(settings, normalizeSettings(null));
      Object.assign(stats, normalizeStats(null));
      log.length = 0;
      persist();
      syncSettingsUI();
      applyStaticI18n();
      renderDynamicCopy();
      applyModeVisual(settings.mode, true);
      resetSessionUI();
      toast(t('toastReset'));
    });

    // Dialog open/close
    $('#settingsBtn').addEventListener('click', () => { syncSettingsUI(); showDialog('#settingsDialog'); });
    $('#helpBtn').addEventListener('click', () => showDialog('#helpDialog'));
    $$('.sheet').forEach((dialog) => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });

    // Mobile drawers
    const openDrawer = (id, toggle) => {
      const panel = $('#' + id);
      panel.classList.add('open');
      $('#scrim').classList.add('show');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    };
    const closeDrawers = () => {
      $$('.panel').forEach((p) => p.classList.remove('open'));
      $('#scrim').classList.remove('show');
      $('#libraryToggle').setAttribute('aria-expanded', 'false');
      $('#logToggle').setAttribute('aria-expanded', 'false');
    };
    $('#libraryToggle').addEventListener('click', () => openDrawer('libraryPanel', $('#libraryToggle')));
    $('#logToggle').addEventListener('click', () => openDrawer('logPanel', $('#logToggle')));
    $$('[data-close]').forEach((btn) => btn.addEventListener('click', closeDrawers));
    $('#scrim').addEventListener('click', closeDrawers);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
      if (e.key === ' ' && !$('#settingsDialog').open && !$('#helpDialog').open) {
        e.preventDefault();
        if (session.running) session.paused ? resumeSession() : pauseSession();
        else startSession();
      } else if (e.key === '1' || e.key === '2' || e.key === '3') {
        const mode = ['sky', 'stream', 'sanctuary'][+e.key - 1];
        settings.mode = mode;
        persist();
        applyModeVisual(mode);
        renderDynamicCopy();
      } else if (e.key === 'Escape') {
        closeDrawers();
      }
    });

    // TTS voices can load asynchronously.
    if (tts.supported) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function showDialog(sel) {
    const d = $(sel);
    if (!d) return;
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
  }

  /* ------------------------------------------------------------------------
     16. SELF-TESTS
     ------------------------------------------------------------------------ */
  function runSelfTests(verbose) {
    const checks = [];
    const check = (name, fn) => {
      try { const result = fn(); checks.push({ name: name, pass: result !== false, detail: typeof result === 'string' ? result : '' }); }
      catch (err) { checks.push({ name: name, pass: false, detail: err.message }); }
    };

    check('20 practices are loaded', () => PRACTICES.length === 20 || 'found ' + PRACTICES.length);
    check('four modules are present', () => MODULES.length === 4);
    check('every practice is bilingual with ordered cues', () => PRACTICES.every((p) =>
      p.title_en && p.title_th && p.cues.length >= 3 &&
      p.cues.every((c) => c.text_en && c.text_th && Number.isFinite(c.time)) &&
      p.cues.every((c, i) => i === 0 || c.time > p.cues[i - 1].time) &&
      p.cues.every((c) => c.time >= 0 && c.time <= 90)
    ));
    check('timing formula scales the 90s arc', () => {
      const total = 10 * 60;
      const scaled = PRACTICES[0].cues.map((c) => scaledCueTime(c, total));
      return Math.abs(scaled[0]) < 1e-9 && Math.abs(scaled[5] - (85 / 90) * total) < 1e-9;
    });
    check('all UI keys exist in both languages', () => {
      const en = Object.keys(I18N.en), th = Object.keys(I18N.th);
      return en.length === th.length && en.every((k) => typeof I18N.th[k] === 'string');
    });
    check('every data-i18n key is translated', () => {
      const missing = $$('[data-i18n]').map((el) => el.getAttribute('data-i18n')).filter((k) => !I18N.en[k] || !I18N.th[k]);
      return missing.length === 0 || 'missing: ' + missing.join(',');
    });
    check('reframing prefixes an observed event', () => {
      const old = settings.lang;
      settings.lang = 'en';
      const out = reframe('work stress', 'thought');
      settings.lang = old;
      return out.indexOf('I notice') >= 0;
    });
    check('Thai reframing responds to language', () => {
      const old = settings.lang;
      settings.lang = 'th';
      const out = reframe('งาน', 'emotion');
      settings.lang = old;
      return out.indexOf('ฉันรู้ทัน') === 0;
    });
    check('time formatting is mm:ss', () => formatTime(0) === '00:00' && formatTime(605) === '10:05');
    check('storage normalisation rejects junk', () => {
      const s = normalizeSettings({ durationMin: 999, mode: 'nope', lang: 'xx' });
      return s.durationMin === 60 && s.mode === 'sky' && s.lang === 'en';
    });
    check('export payload is well formed', () => {
      const d = exportData();
      return d.version === VERSION && d.stats && Array.isArray(d.entries) && d.practicesCompleted === 20;
    });
    check('required DOM landmarks exist', () => ['#scene-canvas', '#practiceList', '#thoughtInput', '#startBtn', '#settingsDialog'].every((s) => !!$(s)));

    const failed = checks.filter((c) => !c.pass);
    if (verbose) {
      checks.forEach((c) => console[c.pass ? 'log' : 'error']((c.pass ? '✓ ' : '✗ ') + c.name + (c.detail ? ' — ' + c.detail : '')));
    }
    return { pass: failed.length === 0, total: checks.length, failed: failed.length, checks: checks };
  }

  /* ------------------------------------------------------------------------
     17. BOOT
     ------------------------------------------------------------------------ */
  function boot() {
    applyStaticI18n();
    renderDynamicCopy();
    syncSettingsUI();
    resetSessionUI();
    initWorld();
    bindEvents();
    updateRangeFill($('#durationSlider'));

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('selftest') === '1') {
        const result = runSelfTests(true);
        document.title = (result.pass ? 'PASS ' : 'FAIL ') + document.title;
      }
    } catch (err) {}

    window.Serenity = {
      version: VERSION,
      practices: PRACTICES,
      modules: MODULES,
      i18n: I18N,
      get state() {
        return {
          settings: Object.assign({}, settings),
          stats: Object.assign({}, stats),
          log: log.slice(),
          session: { running: session.running, paused: session.paused, elapsed: session.elapsed, total: session.total, complete: session.complete }
        };
      },
      runSelfTests: runSelfTests,
      setMode: (mode) => { settings.mode = mode; persist(); applyModeVisual(mode); renderDynamicCopy(); },
      setLanguage: (lang) => { settings.lang = lang; persist(); applyStaticI18n(); renderDynamicCopy(); syncSettingsUI(); },
      addThought: addThought,
      start: startSession,
      pause: pauseSession,
      resume: resumeSession,
      end: () => endSession(true),
      exportData: exportData,
      scaledCueTime: scaledCueTime,
      reframe: reframe,
      audio: audio,
      world: world,
      _setOrbScale: setOrbScale
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
