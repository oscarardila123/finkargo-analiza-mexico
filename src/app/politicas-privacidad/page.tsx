import { ResponsiveHeader } from "@/components/ui/responsive-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function PoliticasPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Políticas de Privacidad
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce cómo Finkargo Colombia S.A.S. protege y maneja tu información personal
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            
            <h2 className="text-2xl font-bold text-gray-600 mb-6">1. OBJETIVO</h2>
            <p className="mb-8">
              El objetivo de esta Política de Privacidad (la "Política") es establecer los lineamientos legales y corporativos bajo los cuales Finkargo Colombia S.A.S. ("Finkargo") recolectará, almacenará, utilizará, y suprimirá los Datos Personales. Del mismo modo busca definir las finalidades del Tratamiento y se implementarán medidas de protección para asegurar que los Datos Personales proporcionados por los Titulares, se mantengan totalmente seguros de cualquier intento de manipulación por personal no autorizado.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">2. ALCANCE</h2>
            <p className="mb-8">
              La Política inicia con la obtención, recolección y Tratamiento de los Datos Personales y finaliza con la supresión de los Datos Personales de acuerdo con las consultas y/o reclamos recibidos del Titular (las "Consultas y/o Reclamos"). Esta Política se aplicará a los Datos Personales registrados en las Bases de Datos, susceptibles de Tratamiento, en virtud de la relación contractual o de servicios sostenidos entre Finkargo y el Titular correspondiente.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">3. DEFINICIONES</h2>
            <p className="mb-4">
              Para efectos de la aplicación de esta Política, se tendrán en cuenta las siguientes definiciones, además de cualquier otra que se incluya a lo largo de la misma.
            </p>
            <div className="space-y-4 mb-8">
              <p><strong>"Autorización"</strong> significa el consentimiento previo, expreso e informado del Titular para llevar a cabo el Tratamiento de sus Datos Personales.</p>
              <p><strong>"Base de Datos"</strong> significa el conjunto organizado de Datos Personales que son objeto de Tratamiento.</p>
              <p><strong>"Dato Personal"</strong> significa cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</p>
              <p><strong>"Dato Personal Público"</strong> significa cualquiera Datos Personales relativos al estado civil de las personas naturales, a su profesión u oficio y a su calidad de comerciante o de servidor público. Por su naturaleza, los Datos Personales Públicos pueden estar contenidos, entre otros, en registros públicos, documentos públicos, gacetas y boletines oficiales y sentencias judiciales debidamente ejecutoriadas que no estén sometidas a reserva. Para el Tratamiento de Datos Personales Públicos, la Autorización del Titular no será necesaria.</p>
              <p><strong>"Dato Personal Sensible"</strong> significa cualesquiera Datos Personales que afectan la intimidad del Titular o cuyo uso indebido puede generar su discriminación, tales como aquéllos que revelen su origen racial o étnico, orientación política, convicciones religiosas o filosóficas, pertenencia a sindicatos, organizaciones sociales, de derechos humanos o que promuevan intereses de cualquier partido político, o que garanticen los derechos y garantías de partidos políticos, así como los datos relativos a la salud, la vida sexual, y los datos biométricos.</p>
              <p><strong>"Encargado del Tratamiento"</strong> significa la persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento por cuenta del Responsable del Tratamiento.</p>
              <p><strong>"Responsable del Tratamiento"</strong> significa Finkargo o a la persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, decida sobre la Base de Datos y/o el Tratamiento.</p>
              <p><strong>"Titular"</strong> significa la persona natural cuyos Datos Personales son objeto de Tratamiento.</p>
              <p><strong>"Tratamiento"</strong> significa cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión, así como también su Transferencia y/o Transmisión a terceros.</p>
              <p><strong>"Transferencia"</strong> significa la transferencia de Datos Personales que tiene lugar cuando el Responsable y/o Encargado del Tratamiento, ubicado en Colombia, envía la información de los Datos Personales a un receptor, que a su vez es Responsable del Tratamiento y se encuentra dentro o fuera del país.</p>
              <p><strong>"Transmisión"</strong> significa el Tratamiento que implica la comunicación a un tercero, Encargado del Tratamiento, cuando dicha comunicación tenga por objeto la realización de un Tratamiento por el Encargado en nombre y por cuenta del Responsable del Tratamiento, para cumplir con las finalidades de este último.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">4. RESPONSABLE DEL TRATAMIENTO</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p><strong>Razón social:</strong> Finkargo Colombia S.A.S</p>
              <p><strong>Dirección:</strong> Cl. 87 No. 12-11, Bogotá D.C., Colombia</p>
              <p><strong>Correo:</strong> contacto@finkargo.com</p>
              <p><strong>Dirección electrónica:</strong> https://www.finkargo.com/</p>
              <p><strong>Teléfono:</strong> +57 318 594 6940</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">5. MARCO NORMATIVO</h2>
            <ul className="list-disc pl-6 space-y-1 mb-8">
              <li>Norma ISO 27001 Tecnología de la Información. Técnicas de Seguridad. Sistema de Gestión de la Seguridad de la Información (SGSI).</li>
              <li>Ley 1266 de 2008 "Disposiciones generales de habeas data – Datos financieros".</li>
              <li>Ley 1581 de 2012 "Disposiciones generales para la protección de datos personales".</li>
              <li>Circular Externa 003 de 2018 "Modificación de numerales de la circular única de la SIC relacionados con el registro nacional de bases de datos".</li>
              <li>Ley 2157 de 2021" Ley de borrón y cuenta nueva".</li>
              <li>Guía de responsabilidad demostrada de la SIC.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">6. PRINCIPIOS PARA EL TRATAMIENTO</h2>
            <p className="mb-4">En el desarrollo, interpretación y aplicación de la presente Política, se aplicarán los siguientes principios:</p>
            <div className="space-y-3 mb-8">
              <p><strong>Principio de legalidad.</strong> Los Datos Personales y el Tratamiento que se le haga a los mismos deben estar bajo las disposiciones legales y regladas por las mismas.</p>
              <p><strong>Principio de finalidad.</strong> El manejo de los Datos Personales tiene siempre una finalidad legítima, la cual debe ser informada al Titular.</p>
              <p><strong>Principio de libertad.</strong> El Tratamiento sólo puede ejercerse con el consentimiento, previo, expreso e informado del Titular. Los Datos Personales no podrán ser obtenidos o divulgados sin previa Autorización, o en ausencia de mandato legal o judicial que releve el consentimiento.</p>
              <p><strong>Principio de veracidad o calidad.</strong> La información sujeta a Tratamiento debe ser veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el Tratamiento de Datos Personales que sean parciales, incompletos, fraccionados o que induzcan a error.</p>
              <p><strong>Principio de transparencia.</strong> Debe garantizarse el derecho del Titular a obtener, en cualquier momento y sin restricciones, información acerca de la existencia de Datos Personales que le conciernan.</p>
              <p><strong>Principio de acceso y circulación restringida.</strong> Solamente podrá tener acceso al Tratamiento las personas asignadas por Finkargo como Responsable o Encargado del Tratamiento.</p>
              <p><strong>Principio de seguridad.</strong> Los Datos Personales tendrán las medidas técnicas, humanas y administrativas que sean necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.</p>
              <p><strong>Principio de confidencialidad.</strong> Todas las personas que intervengan en el Tratamiento que no tengan la naturaleza de Datos Personales Públicos, están obligadas a garantizar la reserva de la información, inclusive después de finalizada su relación con alguna de las actividades que comprende el Tratamiento, pudiendo sólo realizar suministro o comunicación de Datos Personales cuando ello corresponda al desarrollo de las actividades autorizadas según los términos de esta.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">7. TRATAMIENTO Y FINALIDAD</h2>
            <p className="mb-6">
              Los Titulares, a través de su consentimiento, aceptan libre, expresa, previa y de forma inequívoca que sus Datos Personales y Datos Personales Sensibles sean recolectados, almacenados, procesados, usados, suprimidos, Transmitidos y/o Transferidos a terceros. Los Datos Personales suministrados serán utilizados para llevar a cabo las finalidades que se establecen a continuación.
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.1. CLIENTES/USUARIOS</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Otorgar facturas, pagarés y demás títulos valores, así como cualquier otro acto cuya circulación sea permitida por la legislación colombiana.</li>
              <li>Realizar operaciones de cesión de derechos económicos y/o de transferencia de Instrumentos de Pago (tal y como dicho término se define en el Contrato Marco para la Realización de Operaciones de Compraventa de Instrumento suscrito con Finkargo).</li>
              <li>Ejecutar de actividades para el análisis de riesgo operativo, financiero y de concentración por mercado.</li>
              <li>Realizar comparativas de similitudes en operaciones internacionales.</li>
              <li>Contactar a través de medios telefónicos, electrónicos (SMS o chat) o correos electrónicos, para gestionar las actividades de mercadeo, publicidad y relacionamiento con los clientes, incluyendo planes de fidelización, recordación de vencimientos, renovaciones y comunicación sobre productos y servicios actuales y nuevos, así como beneficios e información que pueda ser de interés para los clientes.</li>
              <li>Desarrollar actividades de segmentación, clustering y otros análisis asociados.</li>
              <li>Realizar encuestas de satisfacción y percepción sobre los servicios y productos ofrecidos por Finkargo.</li>
              <li>Tramitar y gestionar de peticiones, quejas, reclamos y solicitudes de los clientes y/o ciudadanos.</li>
              <li>Manejar información por parte de terceros para las gestiones comerciales, o servicios tercerizados por parte de Finkargo.</li>
              <li>Realizar gestiones y/o trámites internos necesarios para acatar la legislación colombiana relacionados y/o derivados de los servicios y/o productos ofrecidos por Finkargo.</li>
              <li>Enviar información editorial, comercial, promocional, invitaciones o atenciones de Finkargo.</li>
              <li>Realizar estudios de mercado y hábitos de comportamiento.</li>
              <li>Efectuar consultas, reportes y actualizaciones en diferentes listas restrictivas y bancos de datos del comportamiento y crédito comercial.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.2. PROVEEDORES</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Dar trámite al objeto de los procesos de selección y contratación.</li>
              <li>Gestionar la documentación y evaluar el servicio de los proveedores.</li>
              <li>Adelantar los procesos de control, auditoría interna, externa y seguridad de la información.</li>
              <li>Administrar, gestionar y controlar los proveedores, así como mantener la información de contacto actualizada para todos los fines contractuales que garanticen la óptima ejecución de los contratos.</li>
              <li>Realizar todas las gestiones y/o trámites internos para acatar la legislación en virtud de la prestación del servicio contratado.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.3. CANDIDATOS/EMPLEADOS/PRACTICANTES Y APRENDICES</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Desarrollar el proceso de reclutamiento, selección, evaluación y vinculación laboral, así como la verificación de los soportes documentales compartidos por los candidatos de forma previa a su vinculación. Incluye verificaciones de seguridad tales como certificaciones laborales, referencias laborales y personales, antecedentes judiciales y consultas en centrales de crédito, así como cualquier otra validación de información realizada con el fin de fortalecer las garantías de seguridad en los procesos de vinculación de personal.</li>
              <li>Enviar información editorial, comercial, promocional, invitaciones o atenciones de Finkargo.</li>
              <li>Realizar estudios y análisis estadísticos.</li>
              <li>Registrar y mantener datos históricos de la información de empleados y/o pensionados (activos o inactivos) en las Bases de Datos.</li>
              <li>Suministrar, compartir, enviar y entregar los Datos Personales del candidato y/o empleado para realizar actividades relacionadas con: estudios de seguridad, accidentes laborales, vinculación a seguridad social, encuestas de clima organizacional, entre otras.</li>
              <li>Suministrar, compartir, enviar y entregar los Datos Personales del empleado a empresas filiales o vinculadas a Finkargo ubicadas en Colombia o cualquier otro país en el evento que dichas empresas requieran la información para el objeto social de Finkargo.</li>
              <li>Dar cumplimiento a las obligaciones contraídas, con relación al pago de salarios, prestaciones sociales y demás retribuciones consagradas en el contrato de trabajo o según lo disponga la legislación colombiana.</li>
              <li>Ofrecer programas de bienestar corporativo y planificar actividades empresariales, para el Titular y sus beneficiarios (hijos, cónyuge, compañero permanente).</li>
              <li>Respaldar las actividades de seguridad y salud en el trabajo, formación y promoción del personal, así como cualquier actividad enmarcada en el desarrollo de la organización y su equipo de trabajo.</li>
              <li>Emitir recomendaciones o referencias laborales una vez se culmine la relación contractual.</li>
              <li>Asegurar el cumplimiento de los acuerdos de confidencialidad.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.4. DATOS SENSIBLES</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Adelantar los procesos legales, auditorías internas y externas.</li>
              <li>Recolectar datos en los puntos de seguridad, tomados de los documentos que suministran las personas a los guardias de seguridad, obtenidos de las videograbaciones que se realizan dentro o fuera de las instalaciones del Finkargo, éstos se utilizarán para fines de seguridad de las personas, los bienes e instalaciones del Finkargo y podrán ser utilizados como prueba en cualquier tipo de proceso.</li>
              <li>Desarrollar actividades de mercadeo como: eventos, paneles y estudios de mercado.</li>
              <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de Finkargo en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con el Titular.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.5. MENORES DE EDAD</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Acceder a los beneficios o derechos en salud, recreación, cultura, educación y demás programas o actividades con Finkargo y/o aquellos terceros con los cuales Finkargo establezcan convenios afines a dicho fin.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">7.6. PARA EL RESTO DE LOS CASOS</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Adelantar los procesos legales, auditorías internas y externas.</li>
              <li>Recolectar datos en los puntos de seguridad, tomados de los documentos que suministran las personas a los guardias de seguridad, obtenidos de las videograbaciones que se realizan dentro o fuera de las instalaciones del Finkargo, éstos se utilizarán para fines de seguridad de las personas, los bienes e instalaciones de Finkargo y podrán ser utilizados como prueba en cualquier tipo de proceso.</li>
              <li>Desarrollar actividades de mercadeo como: eventos, paneles y estudios de mercado.</li>
            </ul>
            <p className="mb-8">
              Salvo por los Datos Personales de menores de edad, según se establece en la Sección 7.5 de esta Política, la información recolectada en cumplimiento de esta Política, y en especial en los términos establecidos en esta Sección 7, podrá ser transferida a terceros, siempre y cuando no contravenga los contratos establecidos entre las partes, a quienes se les exigirá los procedimientos de Tratamiento que establece la legislación colombiana.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">8. DERECHOS DEL TITULAR</h2>
            <p className="mb-4">Las personas obligadas a cumplir estas normas deben respetar y garantizar el ejercicio de los siguientes derechos de los Titulares:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Acceder en forma gratuita a los Datos Personales proporcionados que hayan sido objeto de Tratamiento. La información solicitada por el Titular podrá ser suministrada por cualquier medio, incluyendo los electrónicos, según lo requiera el Titular. La información deberá ser de fácil lectura, sin barreras técnicas que impidan su acceso y deberá corresponder en todo a aquella que repose en la Base de Datos de Finkargo.</li>
              <li>Conocer, actualizar y rectificar los Datos Personales que hayan sido proporcionados de manera parcial, inexacta, incompleta, fraccionada y/o que puedan inducir al error, y/o aquellos cuyo Tratamiento esté prohibido o no haya sido autorizado Para el ejercicio de estos derechos será necesario establecer previamente la identificación de la persona para evitar que terceros no autorizados accedan a los Datos Personales del Titular.</li>
              <li>Solicitar la copia de la Autorización otorgada a Finkargo salvo cuando el Tratamiento, de conformidad con la ley, no lo requiera.</li>
              <li>Recibir información sobre el uso que Finkargo ha dado a los Datos Personales del Titular.</li>
              <li>Presentar ante la Superintendencia de Industria y Comercio ("SIC") quejas por infracciones a lo dispuesto en la ley y las demás normas que la modifiquen, adicionen o complementen.</li>
              <li>Acceder a la solicitud de revocatoria de la Autorización y/o supresión del Dato Personal cuando la SIC haya determinado que en el Tratamiento por parte de Finkargo se ha incurrido en conductas contrarias a la Ley 1581 de 2012 o a la Constitución y, en ese sentido, revocar la Autorización y solicitar la supresión del Dato Personal. Sin perjuicio de lo anterior, la solicitud de supresión y la revocatoria de la Autorización no procederán cuando el Titular tenga un deber legal o contractual de permanecer en la Base de Datos de Finkargo como Responsable y/o Encargado del Tratamiento.</li>
              <li>Abstenerse de responder las preguntas sobre Datos Personales Sensibles. El Titular de dichos Datos Personales Sensibles con la libertad de decidir si desea proporcionar o no esta información a Finkargo.</li>
            </ul>
            
            <p className="mb-4">Los derechos de los Titulares podrán ejercerse por las siguientes personas:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Titular, quien deberá acreditar su identidad en forma suficiente por los distintos medios que le ponga a disposición de Finkargo, la cual, para el efecto podrá mantener mecanismos de validación de la información.</li>
              <li>Representante y/o apoderado del Titular, previa acreditación de la representación o apoderamiento.</li>
              <li>Los derechos de los niños, niñas o adolescentes se ejercerán por las personas que estén facultadas para representarlos y lo prueben a través del registro civil del menor o documento judicial que demuestre su calidad.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">9. DEBERES EN EL TRATAMIENTO</h2>
            <p className="mb-4">Los Responsables y Encargados del Tratamiento están obligadas a cumplir estas normas deben respetar y garantizar el ejercicio de los siguientes deberes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Garantizar al Titular, en todo tiempo, el pleno y efectivo ejercicio del derecho de hábeas data.</li>
              <li>Solicitar y conservar la respectiva Autorización otorgada por el Titular.</li>
              <li>Informar de manera clara y suficiente al Titular sobre la finalidad de la recolección de la información y los derechos que le asisten por virtud de la Autorización otorgada.</li>
              <li>Conservar la información bajo las condiciones de seguridad necesarias para impedir su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.</li>
              <li>Garantizar que la información que se suministre al Responsable o Encargado del Tratamiento sea veraz, completa, exacta, actualizada, comprobable y comprensible.</li>
              <li>Actualizar la información cuando sea necesario.</li>
              <li>Rectificar los Datos Personales cuando ello sea procedente.</li>
              <li>Tramitar las consultas y reclamos formulados en los términos señalados en la presente Política.</li>
              <li>Adoptar un manual interno de políticas y procedimientos para garantizar el adecuado cumplimiento de la ley y en especial, para la atención de Consultas y/o Reclamos.</li>
              <li>Informar a la SIC cuando se presenten violaciones a los códigos de seguridad y existan riesgos en la administración de la información de los Titulares.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">10. ATENCIÓN DE PETICIONES, CONSULTAS Y/O RECLAMOS</h2>
            <p className="mb-4">
              El área de Corporate Systems Process and Controls (SYPCO) es la dependencia que tiene a cargo dar trámite a las solicitudes de los Ttulares para hacer efectivos sus derechos. Ésta podrá ser contactada a través de los siguientes medios:
            </p>

            <p className="mb-4"><strong>A través de un e-mail o correo electrónico dirigido a contacto@finkargo.com con los siguientes datos para poder responderle adecuadamente:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>El nombre del Titular de la información.</li>
              <li>El tipo y número de su documento de identidad.</li>
              <li>Teléfono fijo o celular.</li>
              <li>Correo electrónico registrado en Finkargo.</li>
              <li>Motivo(s)/hecho(s) que dan lugar a la Consulta y/o Reclamo con una breve descripción del derecho que desea ejercer (conocer, actualizar, rectificar, solicitar prueba de la Autorización otorgada, revocarla, suprimir, acceder a la información).</li>
              <li>Firma (si aplica) y número de identificación.</li>
            </ul>
            <p className="mb-6">
              No obstante, las respuestas a través de este medio sólo son remitidas si el correo electrónico desde el cual se efectúa la consulta es el mismo a aquel registrado de manera personal por el Titular en Finkargo.
            </p>

            <p className="mb-4"><strong>A través de la página web en la ruta: https://www.finkargo.com/#contact.</strong></p>
            <p className="mb-4">Para recibir su solicitud por medio de estos canales el Titular de la información deberá llenar los campos correspondientes a:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>El nombre del Titular de la información.</li>
              <li>El tipo y número de su documento de identidad.</li>
              <li>Teléfono fijo o celular.</li>
              <li>Correo electrónico registrado en Finkargo.</li>
              <li>Motivo(s)/hecho(s) que dan lugar a la consulta o reclamo con una breve descripción del derecho que desea ejercer (conocer, actualizar, rectificar, solicitar prueba de la Autorización otorgada, revocarla, suprimir, acceder a la información).</li>
            </ul>
            <p className="mb-8">
              No obstante, las respuestas a través de este medio sólo son remitidas si el correo electrónico desde el cual se efectúa la consulta es el mismo a aquel registrado de manera personal por el Titular en Finkargo.
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">10.1. REQUISITOS PARA EJERCER EL DERECHO DE HABEAS DATA A TRAVÉS DE APODERADO</h3>
            <p className="mb-4">
              Este derecho puede ejercerse por el interesado debidamente identificado o por el apoderado del Titular de la información personal (se debe adjuntar copia del poder con la solicitud). Si se presenta la solicitud por parte de una persona que no fuese el Titular de la información personal, sin cumplir con la presentación del documento idóneo que sustente la representación, ésta deberá ser tenida como no presentada y no se dará respuesta a dicho requerimiento.
            </p>
            <p className="mb-8">
              Los menores de edad deberán ejercer su derecho de habeas data a través de quien acredite su representación legal (tutor, curador, etc.).
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">10.2. TIEMPOS DE RESPUESTA</h3>
            <p className="mb-4">
              <strong>Consulta.</strong> Deberá comunicarse al solicitante en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo de esta; cuando no fuere posible atender la consulta dentro de dicho término, se informará al interesado, expresando los motivos de la demora y señalando la fecha en que se atenderá su consulta, la cual en ningún caso podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer término.
            </p>
            <p className="mb-4">
              <strong>Reclamo.</strong> El término máximo para atender el reclamo será de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo. Cuando no fuere posible atender el reclamo dentro de dicho término, se informará al interesado los motivos de la demora y la fecha en que se atenderá su reclamo, la cual en ningún caso podrá superar los ocho (8) días hábiles siguientes al vencimiento del primer término.
            </p>
            <p className="mb-8">
              En caso de que la solicitud resulte incompleta, se requerirá al interesado la información faltante dentro de los cinco (5) días siguientes a la recepción de la solicitud. Transcurridos dos (2) meses desde la fecha del requerimiento, sin que el solicitante presente la información requerida, se entenderá que ha desistido de esta.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">11. PERSONA O ÁREA RESPONSABLE DE LA PROTECCIÓN DE DATOS PERSONALES</h2>
            <p className="mb-8">
              El oficial de protección de Datos Personales es el Cyber Security Lead y tendrá a su cargo la gestión y verificación del cumplimiento de las leyes y decretos reglamentarios generados por la SIC y la verificación del cumplimiento de los derechos el Titular respecto a conocer, actualizar, rectificar y suprimir sus datos y revocar la Autorización.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">12. VIGENCIA DE LA POLÍTICA</h2>
            <p className="mb-4">
              Esta Política fue aprobada por la asamblea general de accionistas de Finkargo mediante reunión de fecha 1 de junio de 2023, por lo que entró en vigor desde el 2 de junio de 2023.
            </p>
            <p className="mb-4">
              Las Bases de Datos en las que se registrarán los Datos Personales tendrán una vigencia igual al tiempo en que se mantenga y utilice la información para las finalidades descritas en esta política. Una vez se cumpla(n) esa(s) finalidad(es) y siempre que no exista un deber legal o contractual de conservar esta información, los Datos Personales serán eliminados de las Bases de Datos de Finkargo. Otros ejemplos de período de permanencia de los Datos Personales en la Base de Datos son los siguientes:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-8">
              <li>Los Datos Personales proporcionados se conservarán mientras se mantenga la relación contractual con el Titular.</li>
              <li>Los Datos Personales proporcionados se conservarán mientras no se solicite su supresión por el interesado y siempre que no exista un deber legal de conservarlos.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">13. CONTROL DE CAMBIOS</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p><strong>Versión 1</strong></p>
              <p><strong>Fecha:</strong> 01/06/2023</p>
              <p><strong>Primera versión del documento</strong></p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Contacto para ejercer derechos</h3>
              <p className="text-blue-700 mb-2">
                Para ejercer cualquiera de estos derechos o realizar consultas sobre esta política, puede contactarnos a través de:
              </p>
              <p className="text-blue-700">
                <strong>Email:</strong> contacto@finkargo.com<br/>
                <strong>Teléfono:</strong> +57 318 594 6940<br/>
                <strong>Dirección:</strong> Cl. 87 No. 12-11, Bogotá D.C., Colombia
              </p>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}