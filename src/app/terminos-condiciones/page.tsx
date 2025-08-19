import { ResponsiveHeader } from "@/components/ui/responsive-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Servicios Analiza
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acuerdo de Niveles de Servicio entre Finkargo Services S.A.S. y el Usuario
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-3">ACUERDO DE NIVELES DE SERVICIO</h2>
              <p className="text-blue-700">
                El presente acuerdo de niveles de servicio es celebrado entre <strong>FINKARGO SERVICES S.A.S.</strong> y el Usuario.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Artículo I - Servicio: Descripción, Alcance</h2>
            
            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección I.01 – Descripción del Servicio</h3>
            <p className="mb-6">
              Suscripción periódica a Servicios de Computación en la Nube y Conexos para consultas en línea de los movimientos de importación de Colombia desarrollado en la plataforma Power BI de Finkargo (la "Plataforma") (el "Servicio").
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección I.02 – Alcance del Servicio</h3>
            <p className="mb-6">
              Acceso en línea mediante usuario y contraseña por parte del Usuario a la Plataforma para acceder a información de importaciones desde enero del 2022 con actualizaciones mensuales de la información con corte a los dos (2) meses anteriores.
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección I.03 – Tiempo de entrega del Servicio</h3>
            <p className="mb-8">
              Para acceder al Servicio con la Plataforma genérica desarrollada, el tiempo de entrega será dentro de los siguientes tres (3) días hábiles.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Artículo II - Obligaciones de las partes</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección II.01 – Obligaciones del Usuario</h3>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>(a)</strong> Realizar el pago correspondiente por el Servicio adquirido con base en los términos de la Cotización.</li>
              <li><strong>(b)</strong> No divulgar o compartir la información, reportes, informes o entregables producidos, extraídos, tomados y/o descargados desde la Plataforma o con ocasión de la prestación del Servicio, en ninguna circunstancia con ningún tercero distinto al Cliente.</li>
              <li><strong>(c)</strong> Informar acerca de cualquier Incidente (como dicho término se define en la Sección 4.01(a)) dentro de la Plataforma con respecto a la información o falla del Servicio.</li>
              <li><strong>(d)</strong> Asignar el(los) Encargados de la Plataforma (como dicho término se define en la Sección 3.02(a)).</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección II.02 – Obligaciones del Proveedor</h3>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>(a)</strong> Prestar el Servicio oportunamente de acuerdo con el tiempo e información adquirida dentro de la Plataforma.</li>
              <li><strong>(b)</strong> Prestar soporte técnico y consultoría en el uso de la Plataforma dentro de los tiempos indicados en el Artículo IV del presente Acuerdo.</li>
              <li><strong>(c)</strong> Informar oportunamente al Usuario cuando la Plataforma presente fallas o inconsistencias y cuando hayan sido solucionadas.</li>
              <li><strong>(d)</strong> Entregar al Usuario las credenciales necesarias para el acceso a la Plataforma según los Encargados designados.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Artículo III - Controles: Medidas de Protección y Seguridad</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección III.01 – Controles</h3>
            <p className="mb-6">
              El acceso a la Plataforma se realizará con usuario y contraseña provistos por el Proveedor para cada Encargado informado por el Usuario, los cuales estarán disponibles en línea. Una vez adquiere el Servicio, el Usuario podrá acceder desde cualquier dispositivo a la Plataforma en cualquier momento del día durante el Periodo de Suscripción.
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección III.02 – Medidas de protección y seguridad</h3>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>(a)</strong> Con el objetivo de controlar el acceso a la Plataforma y proteger los datos, el Usuario debe informar al Proveedor las personas encargadas del acceso a la misma, y de realizar solicitudes de soporte técnico. Para evitar cualquier duda, las Partes acuerdan que el Usuario deberá designar para dichas labores, como mínimo, a una (1) y máximo tres (3) persona(s), como encargado(s) principal(es), cada uno de los cuales deberá tener su respectivo suplente (el(los) "Encargado(s)").</li>
              <li><strong>(b)</strong> Se asignará una contraseña inicial segura para el(los) encargados principales designados por el Usuario para acceder a la Plataforma, la cual deberá ser modificada de acuerdo con las políticas establecidas por Microsoft 365.</li>
              <li><strong>(c)</strong> Para efectos de seguimiento, monitoreo de la Plataforma, calidad de la información y prestación del Servicio en general, se realizará una encuesta de satisfacción y se contará con soporte y servicio al cliente de lunes a viernes (siempre y cuando dichos días sean hábiles), de 8:00 am a 6:00 pm, hora Colombia.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Artículo IV - Soporte</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección IV.01 – Procedimiento para solicitud de soporte</h3>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>(a)</strong> El Usuario deberá, a través del Encargado designado por este, documentar los casos de soporte, reportar y hacer seguimiento a cualquier error, falla o desperfecto encontrado en el funcionamiento de la Plataforma (el "Incidente").</li>
              <li><strong>(b)</strong> El Proveedor, a través del departamento correspondiente, pondrá a disposición del Usuario, un correo electrónico exclusivo para realizar las solicitudes de soporte en caso de Incidentes.</li>
              <li><strong>(c)</strong> En estos casos, el Usuario, a través de su Encargado, deberá enviar al Proveedor, a través del correo electrónico exclusivo enunciado en la Sección 4.01(b) anterior, el reporte y descripción del caso y del Incidente, así como toda la documentación que lo respalda, para que el equipo de soporte del Proveedor pueda determinar el nivel de impacto, la criticidad y la causa origen del Incidente que se tiene en la Plataforma (el "Reporte"). El Reporte en mención debe incluir: (i) descripción del Incidente; (ii) pantallazos, capturas de pantalla o pruebas del Incidente (si da a lugar); (iii) descripción de cuál es el resultado esperado si no existiera el Incidente en la Plataforma.</li>
              <li><strong>(d)</strong> Una vez el Usuario ha radicado el Reporte, el tiempo de respuesta por parte del Proveedor será de 24 horas hábiles, para que este envíe el diagnóstico de soporte de acuerdo con los niveles de soporte descritos en la Sección 4.02, y le comunique al Usuario las alternativas de solución del Incidente y el tiempo de recuperación del Servicio de acuerdo con los tiempos definidos en la Sección 4.03 (la "Respuesta de Diagnóstico").</li>
              <li><strong>(e)</strong> El Proveedor iniciará con la implementación de solución del Incidente de acuerdo con el tiempo de recuperación establecido en la Respuesta de Diagnóstico, y dará respuesta oficial por correo electrónico informando la solución del Incidente (la "Comunicación de Solución").</li>
              <li><strong>(f)</strong> El Usuario deberá dar respuesta a la Comunicación de Solución recibida por parte del Proveedor, dentro de los dos (2) días siguientes a su recepción, para cerrar el Incidente. Si transcurridos los dos (2) días siguientes a la recepción de la Comunicación de Solución, el Usuario no ha dado respuesta de confirmación y recibido, la misma se considerará aprobada de forma automática y el Incidente se entenderá resuelto.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección IV.02 – Niveles de soporte</h3>
            <div className="space-y-4 mb-6">
              <p><strong>Nivel 1.</strong> Se considera soporte Nivel 1 a Reportes que estén relacionados con el acceso a la Plataforma y navegación, gestión de usuarios y contraseñas, configuración de software, o cualquier otra solicitud que tenga relación con soporte front-end.</p>
              <p><strong>Nivel 2.</strong> Se considera soporte Nivel 2 a Reportes que tengan un mayor grado de complejidad con respecto a la navegación dentro de la plataforma, inconsistencia en la información, usabilidad de filtros, dashboards y gráficos.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección IV.03 – Plazos de recuperación del Servicio y valores mínimos aceptables de los mismos</h3>
            <div className="space-y-4 mb-6">
              <p><strong>(a)</strong> En caso de que el Incidente sea por parte de la navegación de la Plataforma, siendo el proveedor de esta plataforma Microsoft 365, el Proveedor se acoge a los tiempos de recuperación de este.</p>
              <p><strong>(b)</strong> Si el servicio de la Plataforma tiene un Incidente con respecto a la información y reporte desarrollado por el Proveedor, en los tiempos de respuesta y recuperación dependen de la criticidad del Incidente, categorizados de la siguiente manera:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Incidentes críticos:</strong> Cinco (5) días hábiles.</li>
                <li><strong>Incidentes en funcionalidad del reporte:</strong> Uno (1) a tres (3) días hábiles.</li>
                <li><strong>Incidentes no críticos:</strong> Cuatro (4) horas hábiles</li>
              </ul>
              <p><strong>(c)</strong> El Proveedor se reserva la clasificación del Incidente de acuerdo con la criticidad.</p>
              <p><strong>(d)</strong> Los tiempos expresados en la Sección 4.03(b) no incluyen el tiempo de espera de respuesta ante cualquier solicitud de información adicional por parte del Usuario.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección IV.04 – Indicadores y forma de medición de indicadores de calidad del servicio</h3>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>(a)</strong> El Servicio se encontrará disponible para acceso a consultas e información cinco (5) días hábiles a la semana con un 99% up-time, con una tasa de error del 10%.</li>
              <li><strong>(b)</strong> El indicador de cumplimiento con los tiempos de respuesta indicados en este Artículo IV será del 90%.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Artículo V - Responsabilidad</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección V.01</h3>
            <p className="mb-6">
              En caso de que la Plataforma cuente con un Incidente que persista durante uno (1) o más días, se recompensará al Usuario prorrogando el tiempo de acceso a la Plataforma por el mismo tiempo de la duración del Incidente.
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección V.02</h3>
            <p className="mb-8">
              En caso de que no se actualice la Plataforma durante más de noventa (90) días calendario, el Usuario tendrá derecho a solicitar el reembolso por la información que no haya sido recibida, siempre y cuando el valor de la suscripción haya sido pagado por anticipado.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">Artículo VI - Autorización general para el uso y el tratamiento de Datos Personales</h2>

              <h3 className="text-xl font-bold text-purple-700 mb-4">Sección VI.01 – Autorización general</h3>
              <div className="space-y-4 text-purple-700">
                <p><strong>(a)</strong> Finkargo es responsable de los Datos Personales del Usuario, y de toda la información a la cual tenga acceso en el marco de este Acuerdo, así como de los Datos Personales contenidos en los Anexos, formularios, facturas y demás documentos generados en el marco de ejecución del presente Acuerdo.</p>
                <p><strong>(b)</strong> El Usuario autoriza de manera libre, voluntaria, previa, expresa, a Finkargo y sus Afiliadas, así como a Community EM Credit Fund SCA. SICAV-RAIF, Fiduciaria Scotiabank Colpatria S.A., Manejo Técnico de Información S.A. (y/o a quien, de tiempo en tiempo lleve a cabo las funciones de éste para con Finkargo a la Fecha de Firma) y Tecnología en Cuentas por Cobrar S.A.S. (y/o a quien, de tiempo en tiempo, lleve a cabo las funciones de éste para con Finkargo a la Fecha de Firma), para que en los términos legalmente establecidos, y durante la totalidad del Periodo de Suscripción (como dicho término se define en la Cotización), realice la recolección, almacenamiento, uso, circulación, supresión, transmisión, transferencia, y en general, el tratamiento de los Datos Personales que se ha procedido a entregar o que entregará, en virtud de las relaciones legales, contractuales, comerciales y/o de cualquier otra que surja, en desarrollo y ejecución de los fines descritos en este Acuerdo y/o en la Cotización.</p>
                <p><strong>(c)</strong> El Usuario autoriza a Finkargo para que trate, transfiera o transmita los Datos Personales a terceros, como patrimonios autónomos, y/o beneficiarios de los mismos, incluso a países que no cuenten con los niveles adecuados de protección, con las finalidades establecidas en la Política de Privacidad disponible en www.finkargo.com. Dicha autorización se extiende durante la totalidad del tiempo en el que pueda llegar a consolidarse un vínculo o este persista por cualquier circunstancia que se encuentre relacionado con las finalidades para las cuales los Datos Personales, fueron inicialmente suministrados, incluyendo sin limitarse al Periodo de Suscripción (como dicho término se define en la Cotización).</p>
                <p><strong>(d)</strong> Así mismo, en virtud de dicha autorización, Finkargo y sus Afiliadas podrán realizar las consultas, reportes y actualizaciones necesarias en diferentes listas restrictivas y bancos de datos, del comportamiento y crédito comercial, hábitos de pago, manejo de cuenta(s) bancaria(s) y en general el cumplimiento de las obligaciones pecuniarias.</p>
                <p><strong>(e)</strong> El Usuario autoriza a Finkargo, o a quien represente sus derechos, a reportar, procesar, solicitar y divulgar a la Central de Información DATACREDITO, o a cualquier otra entidad que maneje o administre bases de datos con los mismos fines, toda la información referente a su comportamiento como clientes de Finkargo. Lo anterior implica que el cumplimiento o incumplimiento de sus obligaciones se reflejará en las mencionadas bases de datos, en donde se consignan de manera completa, todos los datos referentes a su actual y pasado comportamiento frente al sector financiero y, en general, al cumplimiento de sus obligaciones.</p>
                <p><strong>(f)</strong> De igual forma, quienes suscriben este Acuerdo y/o Cotización, declaran que les ha sido informado y conoce los derechos que el ordenamiento legal conceden al titular de los Datos Personales; conocer, actualizar y rectificar Datos Personales frente a los responsables o encargados del tratamiento; estos derechos se podrán ejercer, entre otros, frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo tratamiento esté expresamente prohibido o no haya sido autorizado. También manifiestan los firmantes conocer que, en los casos en que requieran ejercer los derechos anteriormente mencionados, la respectiva solicitud se puede realizar, (i) mediante el envío de una comunicación al correo notificaciones@finkargo.com; y/o (ii) a través de los mecanismos dispuestos para tal fin por Finkargo o sus Afiliadas, conforme a la Política de Privacidad disponible en www.finkargo.com.</p>
              </div>

              <h3 className="text-xl font-bold text-purple-700 mb-4 mt-6">Sección VI.02 – Autorización de consulta y reportes en centrales de riesgo</h3>
              <div className="space-y-4 text-purple-700">
                <p><strong>(a)</strong> En cumplimiento de lo previsto en la Ley Aplicable y, particularmente en la Ley 1266 de 2008, el Importador autoriza de manera expresa y voluntaria a Finkargo y sus Afiliadas a, durante la totalidad del Periodo de Suscripción (como dicho término se define en la Cotización), recopilar, custodiar, archivar, usar, validar, circular, registrar, suprimir, solicitar, suministrar, procesar, confirmar, tratar, analizar, divulgar o realizar consulta y reporte en los operadores de información legalmente constituidos (centrales de riesgo) del comportamiento crediticio, financiero y comercial del Importador, así como para verificar la información financiera, crediticia y comercial del Importador.</p>
                <p><strong>(b)</strong> El Usuario autoriza a Finkargo a notificar el comportamiento del Usuario en relación con o derivado de las obligaciones previstas en la Cotización, de manera previa al reporte negativo previsto en la Sección 6.02(a), a las centrales de información a través de manera telefónica o cualquier mensaje de datos, incluyendo sin limitarse al correo electrónico, mensaje de texto y/o mensajería instantánea.</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h2 className="text-2xl font-bold text-red-800 mb-6">Artículo VII - Causales de terminación del Servicio/Contrato</h2>
              <p className="text-red-700 mb-4">El Usuario podrá dar por terminado el Servicio en caso de:</p>

              <h3 className="text-xl font-bold text-red-700 mb-3">Sección VII.01</h3>
              <p className="text-red-700 mb-4">
                Incumplimiento por parte del Proveedor en las actualizaciones de información de la Plataforma por más de ciento veinte (120) días calendario.
              </p>

              <h3 className="text-xl font-bold text-red-700 mb-3">Sección VII.02</h3>
              <p className="text-red-700">
                Que la recuperación del Servicio en caso de Incidentes supere un (1) mes calendario.
              </p>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}