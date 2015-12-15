<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output method="text" indent="no"/>

    <xsl:param name="xml-dir"/>
    <xsl:param name="json-dir"/>

    <xsl:variable name="public-sessions">|241|651A|572|348|588|593|623|693|E052|66|500|745|</xsl:variable>
    <xsl:variable name="special-events">|348|588|593|623|E052|693|</xsl:variable>
    <xsl:variable name="connected-academics">|2|233|306|364|676|763|</xsl:variable>
    <xsl:variable name="presidential-theme-sessions">|1|7|8|9|10|11|12|20|22|24|30|32|36|38|42|45|50|51|52|56|57|61|62|63|66|68|69|73|74|76|81|82|83|87|90|97|98|103|104|108|110|113|124|125|133|136|139|140|144|145|146|151|154|160|163|165|167|169|170|171|172|173|174|175|184|188|189|191|192|195|199|208|210|212|213|214|217|220|227|230|231|233|234|238|241|249|252|253|254|255|256|258|260|264|266|267|269|272|273|274|276|280|282|283|284|285|287|293|295|296|297|301|306|307|308|312|315|318|320|324|330|331|332|333|334|337|340|344|345|346|348|349|350|352|357|364|365|366|369|370|375|377|378|383|384|387|389|390|391|393|395|396|397|398|399|400|402|407|409|410|414|418|421|424|425|427|429|431|432|436|437|440|449|452|455|456|458|459|461|462|463|464|465|466|467|471|472|474|477|480|482|486|493|495|496|498|500|504|505|507|508|510|520|521|528|530|531|534|535|539|540|542|545|546|547|548|549|551|555|557|558|563|565|567|568|569|577|579|583|589|591|595|596|597|600|601|605|606|607|608|612|620|623|624|630|632|635|637|642|643|645|652|655|658|659|661|664|669|675|676|679|683|684|686|688|689|690|703|706|708|709|713|714|715|716|721|723|725|726|728|729|731|732|736|738|741|744|745|747|748|751|763|764|767|772|773|779|780|781|782|783|788|793|796|805|806|807|808|809|814|815|816|819|820|821|822|825|826|831|832|837|840|</xsl:variable>

    <xsl:variable name="morning">|4|5|6|7|8|9|10|11|</xsl:variable>
    <xsl:variable name="afternoon">|12|13|14|15|16|17|</xsl:variable>
    <xsl:variable name="evening">|18|19|</xsl:variable>
    <xsl:variable name="late-night">|20|21|22|23|</xsl:variable>

    <!-- Do "queries" in P_DTL_LINE always have a P_PRINT_ORD value of '95'? -->

    <xsl:variable name="date" select="current-date()"/>
    <xsl:variable name="time" select="current-time()"/>

    <xsl:variable name="year" select="substring(string($date), 1, 4)"/>
    <xsl:variable name="month-num" select="number(substring(string($date), 6, 2))"/>
    <xsl:variable name="day" select="number(substring(string($date), 9, 2))"/>

    <xsl:variable name="hour-num" select="number(substring(string($time), 1, 2))"/>
    <xsl:variable name="minutes" select="substring(string($time), 4, 2)"/>

    <xsl:variable name="month">
        <xsl:choose>
            <xsl:when test="$month-num = 12">Dec.</xsl:when>
            <xsl:when test="$month-num = 1">Jan.</xsl:when>
            <xsl:when test="$month-num = 2">Feb.</xsl:when>
            <xsl:when test="$month-num = 3">Mar.</xsl:when>
            <xsl:when test="$month-num = 4">Apr.</xsl:when>
            <xsl:when test="$month-num = 5">May</xsl:when>
            <xsl:when test="$month-num = 6">Jun.</xsl:when>
            <xsl:when test="$month-num = 7">Jul.</xsl:when>
            <xsl:when test="$month-num = 8">Aug.</xsl:when>
            <xsl:when test="$month-num = 9">Sep.</xsl:when>
            <xsl:when test="$month-num = 10">Oct.</xsl:when>
            <xsl:when test="$month-num = 11">Nov.</xsl:when>
            <xsl:otherwise>Jan.</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="hour">
        <xsl:choose>
            <xsl:when test="$hour-num = 0">12</xsl:when>
            <xsl:when test="$hour-num > 12"><xsl:value-of select="$hour-num - 12"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$hour-num"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="meridien">
        <xsl:choose>
            <xsl:when test="$hour-num > 11">p.m.</xsl:when>
            <xsl:otherwise>a.m.</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>


    <!-- Master template -->

    <xsl:template match="CONV_QUARK_XML | CONV_PROG_PARTICIPANT_XML">

        <!-- First pass (XML) -->
        <xsl:variable name="program">

            <xsl:apply-templates select="LIST_G_P_SEQ"/>

            <!-- Missing sessions -->

        </xsl:variable>

        <!-- Sort on session start time -->
        <xsl:variable name="sorted-program">
            <sessions>
                <xsl:for-each select="$program/session">
                    <xsl:sort select="concat(day/@num, substring('0', string-length(start-time/@abbrev)), start-time/@abbrev, start-time/@minutes)" order="ascending" data-type="number"/>
                    <xsl:sort select="replace(sequence, 'A$', '.5')" order="ascending" data-type="number"/>
                    <xsl:copy-of select="."/>
                </xsl:for-each>
            </sessions>
        </xsl:variable>

        <!-- Write as XML -->
        <xsl:result-document href="{$xml-dir}/program.xml" method="xml" indent="yes">
            <xsl:copy-of select="$sorted-program"/>
        </xsl:result-document>

        <!-- Second pass (JSON) -->
        <xsl:apply-templates select="$sorted-program"/>

    </xsl:template>


    <!-- First pass -->

    <xsl:template match="LIST_G_P_SEQ">
        <xsl:apply-templates select="G_P_SEQ[P_DAY and P_DAY != '']"/>
    </xsl:template>

    <xsl:template match="G_P_SEQ">

        <session id="{P_PROG_ID}">

            <sequence>
                <xsl:choose>
                    <xsl:when test="P_SEQ and P_SEQ != ''"><xsl:value-of select="P_SEQ"/><xsl:value-of select="P_SEQ_SFX"/></xsl:when>
                    <xsl:otherwise><xsl:value-of select="P_PROG_ID"/></xsl:otherwise>
                </xsl:choose>
            </sequence>

            <title>
                <xsl:analyze-string select="translate(P_PROG_TLT, '+', '–')" regex="_([^_]+)_">
                    <xsl:matching-substring><em><xsl:value-of select="regex-group(1)"/></em></xsl:matching-substring>
                    <xsl:non-matching-substring><xsl:value-of select="."/></xsl:non-matching-substring>
                </xsl:analyze-string>
            </title>

            <!-- UPDATE: Days of the week -->
            <xsl:choose>
                <xsl:when test="P_DAY = '07-JAN-16'">
                    <date>7 January</date>
                    <day num="1" abbrev="th" ambig="Thurs.">Thursday</day>
                </xsl:when>
                <xsl:when test="P_DAY = '08-JAN-16'">
                    <date>8 January</date>
                    <day num="2" abbrev="fr" ambig="Fri.">Friday</day>
                </xsl:when>
                <xsl:when test="P_DAY = '09-JAN-16'">
                    <date>9 January</date>
                    <day num="3" abbrev="sa" ambig="Sat.">Saturday</day>
                </xsl:when>
                <xsl:when test="P_DAY = '10-JAN-16'">
                    <date>10 January</date>
                    <day num="4" abbrev="su" ambig="Sun.">Sunday</day>
                </xsl:when>
                <xsl:otherwise>
                    <date>[Unknown]</date>
                    <day num="0" abbrev="[Unknown]" ambig="[Unknown]">[Unknown]</day>
                </xsl:otherwise>
            </xsl:choose>

            <xsl:analyze-string select="P_TIME" regex="([0-9]{{1,2}}):([0-9]{{2}}) ?(noon|a\.m\.|p\.m\.)?(\+([0-9]{{1,2}}):([0-9]{{2}}) (noon|a\.m\.|p\.m\.))?">

                <xsl:matching-substring>

                    <xsl:variable name="start-meridien">
                        <xsl:choose>
                            <xsl:when test="regex-group(3)"><xsl:value-of select="regex-group(3)"/></xsl:when>
                            <xsl:when test="regex-group(7)"><xsl:value-of select="regex-group(7)"/></xsl:when>
                            <xsl:otherwise>[Unknown]</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <xsl:variable name="end-meridien">
                        <xsl:choose>
                            <xsl:when test="regex-group(7)"><xsl:value-of select="regex-group(7)"/></xsl:when>
                            <xsl:otherwise>[Unknown]</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <xsl:variable name="start-time-abbrev">
                        <xsl:choose>
                            <xsl:when test="$start-meridien = 'p.m.' and number(regex-group(1)) != 12"><xsl:value-of select="number(regex-group(1)) + 12"/></xsl:when>
                            <xsl:when test="$start-meridien = '[Unknown]'">[Unknown]</xsl:when>
                            <xsl:otherwise><xsl:value-of select="regex-group(1)"/></xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <xsl:variable name="end-time-abbrev">
                        <xsl:choose>
                            <xsl:when test="$end-meridien = 'p.m.' and number(regex-group(5)) != 12"><xsl:value-of select="number(regex-group(5)) + 12"/></xsl:when>
                            <xsl:when test="$end-meridien = '[Unknown]'">[Unknown]</xsl:when>
                            <xsl:otherwise><xsl:value-of select="regex-group(5)"/></xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <xsl:variable name="start-time-ambiguation">
                        <xsl:choose>
                            <xsl:when test="contains($morning, concat('|', $start-time-abbrev, '|'))">mor</xsl:when>
                            <xsl:when test="contains($afternoon, concat('|', $start-time-abbrev, '|'))">aft</xsl:when>
                            <xsl:when test="contains($evening, concat('|', $start-time-abbrev, '|'))">eve</xsl:when>
                            <xsl:when test="contains($late-night, concat('|', $start-time-abbrev, '|'))">ln</xsl:when>
                            <xsl:otherwise>[Unknown]</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <xsl:variable name="end-time-ambiguation">
                        <xsl:choose>
                            <xsl:when test="contains($morning, concat('|', $end-time-abbrev, '|'))">mor</xsl:when>
                            <xsl:when test="contains($afternoon, concat('|', $end-time-abbrev, '|'))">aft</xsl:when>
                            <xsl:when test="contains($evening, concat('|', $end-time-abbrev, '|'))">eve</xsl:when>
                            <xsl:when test="contains($late-night, concat('|', $end-time-abbrev, '|'))">ln</xsl:when>
                            <xsl:otherwise>[Unknown]</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <start-time abbrev="{$start-time-abbrev}" minutes="{regex-group(2)}" ambig="{$start-time-ambiguation}" header="{regex-group(1)}:{regex-group(2)} {$start-meridien}">
                        <xsl:value-of select="regex-group(1)"/>:<xsl:value-of select="regex-group(2)"/><xsl:text> </xsl:text><xsl:value-of select="$start-meridien"/>
                    </start-time>

                    <xsl:if test="regex-group(4)">
                        <end-time abbrev="{$end-time-abbrev}" minutes="{regex-group(6)}" ambig="{$end-time-ambiguation}">
                            <xsl:value-of select="regex-group(5)"/>:<xsl:value-of select="regex-group(6)"/><xsl:text> </xsl:text><xsl:value-of select="$end-meridien"/>
                        </end-time>
                    </xsl:if>

                </xsl:matching-substring>

                <xsl:non-matching-substring>
                    <extra-time-info>[Unknown] <xsl:value-of select="."/></extra-time-info>
                </xsl:non-matching-substring>

            </xsl:analyze-string>

            <xsl:if test="(P_HOTEL and P_HOTEL != '') or (P_OFFSITE and P_OFFSITE = 'Y')">

                <venue>

                    <!-- UPDATE: Venues -->
                    <xsl:attribute name="abbrev">
                        <xsl:choose>
                            <xsl:when test="P_HOTEL = 'ACC'">acc</xsl:when>
                            <xsl:when test="P_HOTEL = 'JW Marriott'">jwm</xsl:when>
                            <xsl:when test="P_OFFSITE and P_OFFSITE = 'Y'">off</xsl:when>
                            <xsl:otherwise>[Unknown]</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>

                    <xsl:value-of select="P_HOTEL"/>

                </venue>

            </xsl:if>

            <xsl:if test="P_ROOM and P_ROOM != ''">
                <room><xsl:value-of select="P_ROOM"/></room>
            </xsl:if>

            <xsl:if test="P_SOCIAL and P_SOCIAL = 'Y'">
                <type abbrev="soc">Social</type>
            </xsl:if>

            <xsl:if test="contains($presidential-theme-sessions, concat('|', P_SEQ, P_SEQ_SFX, '|'))">
                <type abbrev="pre">Presidential Theme</type>
            </xsl:if>

            <xsl:if test="contains($public-sessions, concat('|', P_SEQ, P_SEQ_SFX, '|'))">
                <type abbrev="pub">Open to the Public</type>
            </xsl:if>

            <xsl:if test="contains($special-events, concat('|', P_SEQ, P_SEQ_SFX, '|'))">
                <type abbrev="spe">Special Event</type>
            </xsl:if>

            <xsl:if test="contains($connected-academics, concat('|', P_SEQ, P_SEQ_SFX, '|'))">
                <type abbrev="aca">Connected Academics</type>
            </xsl:if>

            <details>

                <line role="calendar"><xsl:value-of select="translate(P_TM_SLOT, '+', '–')"/></line>

                <xsl:if test="LIST_G_P_DTL_LINE">

                    <xsl:for-each select="LIST_G_P_DTL_LINE/G_P_DTL_LINE">

                        <xsl:sort select="P_PRINT_ORD" data-type="number" order="ascending"/>

                        <xsl:if test="P_DTL_LINE and P_DTL_LINE != '' and P_PRINT_ORD != '95'">

                            <xsl:variable name="sequence" select="../../P_SEQ"/>

                            <xsl:choose>

                                <xsl:when test="P_PRINT_ORD &lt;= 10 or ($sequence != '440' and $sequence != '692')">

                                    <line>

                                        <xsl:analyze-string select="translate(P_DTL_LINE, '+', '–')" regex="_([^_]+)_">
                                          <xsl:matching-substring><em><xsl:value-of select="regex-group(1)"/></em></xsl:matching-substring>
                                          <xsl:non-matching-substring>

                                              <xsl:analyze-string select="." regex="@IT@([^@]+)@RO@">
                                                  <xsl:matching-substring><em><xsl:value-of select="regex-group(1)"/></em></xsl:matching-substring>
                                                  <xsl:non-matching-substring>
                                                      <xsl:analyze-string select="." regex="^  . ">
                                                          <xsl:matching-substring></xsl:matching-substring>
                                                          <xsl:non-matching-substring>
                                                              <xsl:value-of select="replace(., '--', '—')"/>
                                                          </xsl:non-matching-substring>
                                                      </xsl:analyze-string>
                                                  </xsl:non-matching-substring>
                                                </xsl:analyze-string>

                                            </xsl:non-matching-substring>
                                        </xsl:analyze-string>

                                    </line>

                                </xsl:when>

                                <!-- UPDATE: Specially formatted sessions -->
                                <xsl:when test="$sequence = '440' and position() = last()">
                                  <line>1. Report of the Executive Director, Rosemary G. Feal</line>
                                  <line>2. The Presidential Address, "Literature and Its Publics: Past, Present, and Future," Roland Greene, Stanford Univ., MLA President. Greene discusses the changing idea of the public for our work as scholars and teachers and reflects on the state of the interpretive humanities in and out of the academy. How can we fashion a model of our disciplines that speaks to the need in our public culture for a complex, historically informed engagement with texts of all sorts?</line>
                                  <line>Reception immediately following.</line>
                                </xsl:when>

                                <xsl:when test="$sequence = '692' and position() = last()">
                                  <line>1. Roland Greene will announce the newly elected honorary fellows.</line>
                                  <line>2. Remarks by William Adams, National Endowment for the Humanities</line>
                                  <line>3. Kwame Anthony Appiah, New York Univ., MLA First Vice President, will present the William Riley Parker Prize; James Russell Lowell Prize; MLA Prize for a First Book; Kenneth W. Mildenberger Prize; Katherine Singer Kovacs Prize; Morton N. Cohen Award; MLA Prize for a Scholarly Edition; Aldo and Jeanne Scaglione Prize for Comparative Literary Studies; Aldo and Jeanne Scaglione Prize for French and Francophone Studies; Aldo and Jeanne Scaglione Prize for Studies in Slavic Languages and Literatures; Aldo and Jeanne Scaglione Prize for a Translation of a Scholarly Study of Literature; Aldo and Jeanne Scaglione Prize for Italian Studies; Aldo and Jeanne Scaglione Publication Award for a Manuscript in Italian Literary Studies; Lois Roth Award; William Sanders Scarborough Prize; and MLA Prize in United States Latina and Latino and Chicana and Chicano Literary and Cultural Studies.</line>
                                  <line>4. Rosemary G. Feal, MLA, will present the <em>MLA International Bibliography</em> Fellowship Awards.</line>
                                  <line>5. Rosemary G. Feal will announce the recipients of the seal of approval from the Committee on Scholarly Editions.</line>
                                  <line>6. Sonja Rae Fritzsche, Illinois Wesleyan Univ., ADFL President, will present the ADFL Award for Distinguished Service to the Profession to Malcolm Alan Compitello, Univ. of Arizona, Tucson.</line>
                                  <line>7. Remarks by Malcolm Alan Compitello</line>
                                  <line>8. Kent Cartwright, Univ. of Maryland, College Park, ADE President, will present the ADE Francis Andrew March Award to John David Guillory, New York Univ.</line>
                                  <line>9. Remarks by John David Guillory</line>
                                  <line>Reception immediately following.</line>
                                </xsl:when>

                            </xsl:choose>


                        </xsl:if>

                    </xsl:for-each>

                </xsl:if>

            </details>

            <!-- Currently unused -->

            <xsl:if test="S_TYPE and S_TYPE != ''">

                <xsl:choose>
                    <xsl:when test="S_TYPE = 'Special Session'">
                        <type abbrev="sps"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Special Event'">
                        <type abbrev="spe"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'MLA Organization'">
                        <type abbrev="mla"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Allied Organization'">
                        <type abbrev="all"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Affliate Organization'">
                        <type abbrev="aff"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Affiliate Organization'">
                        <type abbrev="aff"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'American Literature Section'">
                        <type abbrev="als"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Division'">
                        <type abbrev="div"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Discussion Group'">
                        <type abbrev="dis"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Forum'">
                        <type abbrev="for"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:when test="S_TYPE = 'Forum Linked Session'">
                        <type abbrev="fls"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:when>
                    <xsl:otherwise>
                        <type abbrev="[Unknown]"><xsl:value-of select="S_TYPE"/></type>
                    </xsl:otherwise>
                </xsl:choose>

            </xsl:if>

            <xsl:if test="LIST_G_1">

                <xsl:for-each select="LIST_G_1/G_1">

                    <xsl:sort data-type="number" order="ascending">
                        <xsl:attribute name="select">
                            <xsl:choose>
                                <xsl:when test="P_ROLE = 'Session Leader or Presider'">1</xsl:when>
                                <xsl:when test="P_ROLE = 'Speaker'">2</xsl:when>
                                <xsl:when test="P_ROLE = 'Respondent or Panelist'">3</xsl:when>
                                <xsl:otherwise>4</xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </xsl:sort>

                    <speaker>

                        <xsl:attribute name="role">
                            <xsl:choose>
                                <xsl:when test="P_ROLE = 'Session Leader or Presider'">leader</xsl:when>
                                <xsl:when test="P_ROLE = 'Speaker'">speaker</xsl:when>
                                <xsl:when test="P_ROLE = 'Respondent or Panelist'">respondent</xsl:when>
                                <xsl:otherwise>[Unknown]</xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>

                        <xsl:value-of select="P_FNAME"/><xsl:text> </xsl:text><xsl:value-of select="P_LNAME"/>

                    </speaker>

                </xsl:for-each>

            </xsl:if>

        </session>

    </xsl:template>

    <xsl:template name="parse-calendar">

        <xsl:param name="str"/>

        <!-- Strip out meridiens and "noon" -->
        <xsl:variable name="str2" select="replace($str, ' noon', '')"/>
        <xsl:variable name="str3" select="replace($str2, ' a.m.', '')"/>
        <xsl:variable name="str4" select="replace($str3, ' p.m.', '')"/>

        <!-- UPDATE: Venue names -->
        <!-- Shorten venue names -->

        <xsl:value-of select="$str4"/>

    </xsl:template>


    <!-- Second pass (JSON output) -->

    <xsl:template match="sessions">

        <xsl:result-document href="{$json-dir}/program.json">
            <xsl:text>[</xsl:text>
            <xsl:apply-templates select="session" mode="program">
                <xsl:sort select="concat(day/@num, substring('0', string-length(start-time/@abbrev)), start-time/@abbrev, start-time/@minutes)" order="ascending" data-type="number"/>
                <xsl:sort select="replace(sequence, 'A$', '.5')" order="ascending" data-type="number"/>
              </xsl:apply-templates>
            <xsl:text>]</xsl:text>
        </xsl:result-document>

        <xsl:result-document href="{$json-dir}/updated.json">
            <xsl:text>{</xsl:text>
            <xsl:text>"date":"</xsl:text><xsl:value-of select="$day"/><xsl:text> </xsl:text><xsl:value-of select="$month"/><xsl:text> </xsl:text><xsl:value-of select="$year"/><xsl:text>",</xsl:text>
            <xsl:text>"time":"</xsl:text><xsl:value-of select="$hour"/>:<xsl:value-of select="$minutes"/><xsl:text> </xsl:text><xsl:value-of select="$meridien"/><xsl:text>",</xsl:text>
            <xsl:text>"timezone":"EST"</xsl:text>
            <xsl:text>}</xsl:text>
        </xsl:result-document>

    </xsl:template>

    <xsl:template match="session" mode="program">

        <xsl:if test="position() = 1 or start-time/@header != preceding-sibling::session[1]/start-time/@header">

            <!-- Subheads for approximate session times -->
            <xsl:variable name="tod" select="concat(day, start-time/@abbrev)"/>
            <xsl:variable name="concurrent" select="self::session|following-sibling::session[concat(day, start-time/@abbrev) = $tod]"/>
            <xsl:variable name="subhead-categories">
                <xsl:text>[</xsl:text>
                <xsl:text>"</xsl:text><xsl:value-of select="day/@abbrev"/><xsl:text>",</xsl:text>
                <xsl:text>"</xsl:text><xsl:value-of select="start-time/@ambig"/><xsl:text>"</xsl:text>
                <!-- UPDATE: All filterable session classes -->
                <xsl:if test="count($concurrent[venue/@abbrev = 've']) &gt; 0">
                    <xsl:text>,"ve"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[venue/@abbrev = 'vw']) &gt; 0">
                    <xsl:text>,"vw"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[venue/@abbrev = 'eh']) &gt; 0">
                    <xsl:text>,"eh"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[venue/@abbrev = 'off']) &gt; 0">
                    <xsl:text>,"off"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[type/@abbrev = 'pub']) &gt; 0">
                    <xsl:text>,"pub"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[type/@abbrev = 'soc']) &gt; 0">
                    <xsl:text>,"soc"</xsl:text>
                </xsl:if>
                <xsl:if test="count($concurrent[type/@abbrev = 'pre']) &gt; 0">
                    <xsl:text>,"pre"</xsl:text>
                </xsl:if>
                <xsl:text>]</xsl:text>
            </xsl:variable>

            <!-- JSON output -->
            <xsl:text>{</xsl:text>
            <xsl:text>"type":"subhead",</xsl:text>
            <xsl:text>"cat":</xsl:text><xsl:value-of select="$subhead-categories"/><xsl:text>,</xsl:text>
            <xsl:text>"title":"</xsl:text><xsl:value-of select="day"/>, <xsl:value-of select="start-time/@header"/><xsl:text>"</xsl:text>
            <xsl:text>},</xsl:text>

        </xsl:if>

        <xsl:variable name="session-categories">
            <xsl:text>[</xsl:text>
            <xsl:text>"</xsl:text><xsl:value-of select="day/@abbrev"/><xsl:text>",</xsl:text>
            <xsl:text>"</xsl:text><xsl:value-of select="start-time/@ambig"/><xsl:text>",</xsl:text>
            <xsl:text>"</xsl:text><xsl:value-of select="venue/@abbrev"/><xsl:text>"</xsl:text>
            <xsl:for-each select="type">
                <xsl:text>,"</xsl:text>
                <xsl:value-of select="@abbrev"/>
                <xsl:text>"</xsl:text>
            </xsl:for-each>
            <xsl:if test="contains(room, 'Exhibit Hall Theater')">
                <xsl:text>,"eh"</xsl:text>
            </xsl:if>
            <xsl:text>]</xsl:text>
        </xsl:variable>

        <!-- JSON output -->
        <xsl:text>{</xsl:text>
        <xsl:text>"id":"</xsl:text><xsl:value-of select="sequence"/><xsl:text>",</xsl:text>
        <xsl:text>"oid":"</xsl:text><xsl:value-of select="@id"/><xsl:text>",</xsl:text>
        <xsl:text>"cat":</xsl:text><xsl:value-of select="$session-categories"/><xsl:text>,</xsl:text>
        <xsl:text>"title":"</xsl:text><xsl:apply-templates select="title/node()"/><xsl:text>",</xsl:text>
        <xsl:text>"venue":"</xsl:text><xsl:value-of select="venue"/><xsl:text>",</xsl:text>
        <xsl:text>"room":"</xsl:text><xsl:value-of select="room"/><xsl:text>",</xsl:text>
        <xsl:text>"loc":"</xsl:text><xsl:call-template name="parse-calendar"><xsl:with-param name="str" select="details/line[@role = 'calendar'][1]/node()"/></xsl:call-template><xsl:text>",</xsl:text>
        <xsl:text>"cal":"</xsl:text><xsl:value-of select="day"/>, <xsl:apply-templates select="details/line[@role = 'calendar'][1]/node()"/><xsl:text>",</xsl:text>
        <xsl:text>"text":[</xsl:text>
        <xsl:for-each select="details/line">
            <xsl:if test="not(@role) or @role != 'calendar'">
                <xsl:text>"</xsl:text><xsl:apply-templates select="node()"/><xsl:text>"</xsl:text>
                <xsl:if test="position() != last()">,</xsl:if>
            </xsl:if>
        </xsl:for-each>
        <xsl:text>]}</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>

    </xsl:template>

    <xsl:template match="*">
        <xsl:text>&lt;</xsl:text>
        <xsl:value-of select="name()"/>
        <xsl:for-each select="@*">
            <xsl:text> </xsl:text>
            <xsl:value-of select="name()"/>
            <xsl:text>=\&quot;</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>\&quot;</xsl:text>
        </xsl:for-each>
        <xsl:text>&gt;</xsl:text>
        <xsl:apply-templates select="* | text()"/>
        <xsl:text>&lt;/</xsl:text>
        <xsl:value-of select="name()"/>
        <xsl:text>&gt;</xsl:text>
    </xsl:template>

    <xsl:template match="text()">

        <xsl:analyze-string select="." regex="\s+">
            <xsl:matching-substring><xsl:text> </xsl:text></xsl:matching-substring>
            <xsl:non-matching-substring><xsl:value-of select="replace(., '&quot;', '\\&quot;')"/></xsl:non-matching-substring>
        </xsl:analyze-string>

    </xsl:template>

</xsl:stylesheet>
