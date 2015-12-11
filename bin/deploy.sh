#!/bin/bash

# update.sh
# ---------------------
# Chris Zarate, 2013-10

# EXPECTS $scripts_dir to be defined by your environment.


###############################
### BEGIN REUSABLE PROLOGUE ###
###############################


## Usage

  usage_text="[OPTIONS] -a [program_xml] -b [people_xml]

  This script looks for updated Program XML and People XML. If files differ
  from the previous version, it outputs new HTML and JSON files and uploads
  them to the staging site.

  OPTIONS:
    -a xml_file  Program XML
    -b xml_file  People XML
    -n email     E-mail address for notification
    -s           Enable logging (no console output)
    -h           Show this message
"


## Command-line options

  flags=a:b:n:sh

  options () {
    case $opt in
      a) program_xml="$OPTARG";;
      b) people_xml="$OPTARG";;
      n) notify_email="$OPTARG";;
      s) enable_log="y";;
      h) usage;;
      :) usage;;
      *) usage;;
    esac
  }

  # Required options
  required_options="program_xml people_xml"


## Configuration

  # Get current directory
  current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

  # Project directory
  project_dir="$current_dir/.."

  # Archive directory
  archive_dir="$project_dir/xml/archive"

  # XML directory
  xml_dir="$project_dir/xml"

  # XSL directory
  xsl_dir="$project_dir/xsl"

  # Public directory
  public_dir="$project_dir/public"

  # Data directory
  json_dir="$public_dir/data"

  # Requirements
  require_files="program_xml people_xml"
  require_dirs="archive_dir xml_dir xsl_dir public_dir json_dir"


## Safety

  # Exit if bash helper has not been loaded
  if [[ -z "$scripts_dir" ]]; then
    echo "Could not connect to $scripts_dir."
    exit
  fi


  ## Bash

  # Source the Bash helper script
  source $scripts_dir/include/bash/bash-helper.sh

  # Source the Bash functions script
  source $scripts_dir/include/bash/bash-functions.sh


#############################
### END REUSABLE PROLOGUE ###
#############################


## Program

# Compare INCOMING XML with PREVIOUS XML
if `diff -q "$program_xml" "$archive_dir/program_latest.xml" >/dev/null`; then
	echo "The program XML has not been updated."
else

	echo "UPDATED program XML has been detected!"
	updated_files=YES

	# Keep a copy of the updated XML.
	cp $program_xml "$archive_dir/program_latest.xml"

	# Transform Oracle output.
	transform_saxon8 "$program_xml" "$xsl_dir/program.xsl" "xml-dir=${xml_dir} json-dir=${json_dir}"

fi


## People

# Compare INCOMING XML with PREVIOUS XML
if `diff -q "$people_xml" "$archive_dir/people_latest.xml" >/dev/null`; then
	echo "The participant XML has not been updated."
else

	echo "UPDATED participant XML has been detected!"
	updated_files=YES

	# Keep a copy of the updated XML.
	cp "$people_xml" "$archive_dir/people_latest.xml"

	# Transform Oracle output.
	transform_saxon8 "$people_xml" "$xsl_dir/people.xsl" "xml-dir=${xml_dir} json-dir=${json_dir}"

fi


## Deploy

if [ -n "$updated_files" ]; then

  # Commit updated XML and JSON.
  cd "$xml_dir" && git commit *.xml -m "Updated program XML (${current_date}_${current_time})."
  cd "$json_dir" && git commit *.json -m "Updated program JSON (${current_date}_${current_time})."

	# Deploy.
  cd "$project_dir"
  #aws s3 cp "$json_dir/*" s3://staging.mla16.org/data/
  #aws cf invalidate

  # Notify
  if [ -n "$notify_email" ]; then
    echo "New files were successfully copied to the staging site. Time stamp: ${current_date}_${current_time}." | mail -s "MLA Program updated" $notify_email
  fi

fi
